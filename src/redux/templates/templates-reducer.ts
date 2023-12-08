import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IInitialStateTemplates, ITemplate } from '../types';

const initialState: IInitialStateTemplates = {
  templates: [],
  template: {url: '', name: '', attribute: []},
  attribute: [],
  openAttr: [],
  filter: '',
  selectedItem: '',
  isMarked: '',
}

export const templatesReducer = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<ITemplate[]>) => ({
      ...state,
      templates: action.payload,
    }),
    setTemplate: (state, action: PayloadAction<ITemplate>) => ({
      ...state,
      template: action.payload,
    }),
    setAttribute: (state, action: PayloadAction<string[]>) => ({
      ...state,
      attribute: action.payload,
    }),
    setOpenAttr: (state, action: PayloadAction<string[]>) => ({
      ...state,
      openAttr: action.payload,
    }),
    setFilter: (state, action: PayloadAction<string>) => ({
      ...state,
      filter: action.payload,
    }),
    setSelectedItem: (state, action: PayloadAction<string>) => ({
      ...state,
      selectedItem: action.payload,
    }),
    setIsMarked: (state, action: PayloadAction<string>) => ({
      ...state,
      isMarked: action.payload,
    }),
    setClearAttr: (state,) => ({
      ...state,
      openAttr: [],
      attribute: [],
      selectedItem: '',
    }),
  },
});

export const {
  setTemplate,
  setTemplates,
  setAttribute,
  setOpenAttr,
  setClearAttr,
  setFilter,
  setSelectedItem,
  setIsMarked
} = templatesReducer.actions;

export default templatesReducer.reducer;