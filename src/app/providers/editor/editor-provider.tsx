'use client'
import { EditorBtns } from '@/lib/constants'
import { EditorAction } from './editor-actions'
import { Dispatch, createContext, useContext, useReducer } from 'react'

// Define a specific type for page details to replace 'any'
// TODO: Flesh out this type with the actual properties of pageDetails
export type PageDetails = {
  id: string;
  name: string;
  // Add other properties as needed
};

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

export type EditorElement = {
  id: string
  styles: React.CSSProperties
  name: string
  type: EditorBtns
  content: EditorElement[] | { href?: string; innerText?: string; src?: string }
}

export type Editor = {
  liveMode: boolean
  elements: EditorElement[]
  selectedElement: EditorElement
  device: DeviceTypes
  previewMode: boolean
}

export type HistoryState = {
  history: Editor[]
  currentIndex: number
}

export type EditorState = {
  editor: Editor
  history: HistoryState
}

const initialEditorState: EditorState['editor'] = {
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: {
    id: '',
    content: [],
    name: '',
    styles: {},
    type: null,
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
}

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
}

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
}

const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'ADD_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Add Element editor State'
    )
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      }
    }
    return item
  })
}

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'UPDATE_ELEMENT') {
    throw Error('You sent the wrong action type to the update Element State')
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      }
    }
    return item
  })
}

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'DELETE_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Delete Element editor State'
    )
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action)
    }
    return true
  })
}

const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    // Adds a new element to the editor
    case 'ADD_ELEMENT':
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      }
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ]

      return {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      }

    // Updates an existing element in the editor
    case 'UPDATE_ELEMENT':
      const updatedElements = updateAnElement(state.editor.elements, action)
      const UpdatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : state.editor.selectedElement,
      }

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate },
      ]

      return {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      }

    // Deletes an element from the editor
    case 'DELETE_ELEMENT':
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action
      )
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      }

      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete },
      ]

      return {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      }

    // Sets the currently clicked element
    case 'CHANGE_CLICKED_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || initialEditorState.selectedElement,
        },
      }

    // Changes the device view (Desktop, Mobile, Tablet)
    case 'CHANGE_DEVICE':
      return {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      }

    // Toggles the preview mode
    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      }

    // Toggles the live mode
    case 'TOGGLE_LIVE_MODE':
      return {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload?.value ?? !state.editor.liveMode,
        },
      }

    // Redoes the last action
    case 'REDO':
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1
        return {
          ...state,
          editor: state.history.history[nextIndex],
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        }
      }
      return state

    // Undoes the last action
    case 'UNDO':
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1
        return {
          ...state,
          editor: state.history.history[prevIndex],
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        }
      }
      return state

    // Loads data into the editor
    case 'LOAD_DATA':
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      }

    default:
      return state
  }
}

export type EditorContextData = {
  device: DeviceTypes
  previewMode: boolean
  setPreviewMode: (previewMode: boolean) => void
  setDevice: (device: DeviceTypes) => void
}

export const EditorContext = createContext<{
  state: EditorState
  dispatch: Dispatch<EditorAction>
  subaccountId: string
  funnelId: string
  pageDetails: PageDetails | null
}>({
  state: initialState,
  dispatch: () => undefined,
  subaccountId: '',
  funnelId: '',
  pageDetails: null,
})

type EditorProps = {
  children: React.ReactNode
  subaccountId: string
  funnelId: string
  pageDetails: PageDetails
}

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        subaccountId: props.subaccountId,
        funnelId: props.funnelId,
        pageDetails: props.pageDetails,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor Hook must be used within the editor Provider')
  }
  return context
}

export default EditorProvider