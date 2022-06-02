// bucket.js
import { db } from "../../firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Actions
const READ = 'dict/READ';
const CREATE = 'dict/CREATE';
const UPDATE = 'dict/UPDATE';
const DELETE = 'dict/DELETE';

// Action Creators
export function readDict(dict_list) {
    return { type: READ, dict_list };
}

export function createDict(dict) {
    console.log("생성!")
    return { type: CREATE, dict };
}

export function deleteDict(dict_index) {
    console.log("삭제!")
    return { type: DELETE, dict_index };
}

export function updateDict(dict_index) {
    console.log("완료!")
    return { type: UPDATE, dict_index };
}


const initialState = {
    list: []
}

// export function updateWidget(widget) {
//     return {
//         type: UPDATE,
//         widget
//     };
// }

// middlewares
export const readDictFB = () => {
    return async function (dispatch) {
        const dict_data = await getDocs(collection(db, "dictionary"));
        // console.log(dict_data)

        let dict_list = []

        dict_data.forEach((doc) => {
            // console.log(doc.data())
            dict_list.push({ id: doc.id, ...doc.data() })
            // 위랑 같은 내용
            // dict_list = [...dict_list, {...doc.data()}]
        })

        // console.log(dict_list)

        dispatch(readDict(dict_list))
    }
}

export const createDictFB = (dict) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "dictionary"), dict)
        // console.log((await getDoc(docRef)).data())
        const _dict = await getDoc(docRef)
        const dict_data = { id: _dict.id, ..._dict.data() }
        // console.log(dict_data)
        dispatch(createDict(dict_data))
    }
}

export const updateDictFB = (dict_id) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "dictionary", dict_id)
        // console.log(dict_id)
        await updateDoc(docRef, { completed: true })

        // console.log(getState().dict)
        const _dict_list = getState().dict.list
        const dict_index = _dict_list.findIndex((doc) => {
            return doc.id === dict_id
        })

        // console.log(dict_index)
        dispatch(updateDict(dict_index))
    }
}

export const deleteDictFB = (dict_id) => {
    return async function (dispatch, getState) {
        if(!dict_id){
            window.alert("ID 없음")
            return
        }
        const docRef = doc(db, "dictionary", dict_id)
        await deleteDoc(docRef)

        const _dict_list = getState().dict.list
        const dict_index = _dict_list.findIndex((doc) => {
            return doc.id === dict_id
        })

        dispatch(deleteDict(dict_index))
    }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "dict/READ": {
            return { list: action.dict_list }
        }

        case "dict/CREATE": {
            const new_dict_list = [...state.list, action.dict]
            return { list: new_dict_list };
        }

        case "dict/UPDATE": {
            const new_dict_list = state.list.map((l, idx) => {
                if (parseInt(action.dict_index) === idx) {
                    return { ...l, completed: true }
                } else {
                    return l;
                }
            })
            return { list: new_dict_list };
        }

        case "dict/DELETE": {
            // console.log(state, action)
            const new_dict_list = state.list.filter((l, idx) => {
                return parseInt(action.dict_index) !== idx;
            })

            return { list: new_dict_list };
        }

        // do reducer stuff
        default:
            return state;
    }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget() {
//     return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }