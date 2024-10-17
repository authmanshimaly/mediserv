import { createSlice } from '@reduxjs/toolkit';

const windowSlice = createSlice({
    name: 'window',
    initialState: {
        isOpen: 0, // 0 for closed, 1 for open
        windowRef: null, // Store the window reference here
    },
    reducers: {
        // Action to open the window
        openWindow: (state, action) => {
            state.isOpen = 1; // Set the state to open
            state.windowRef = action.payload; // Store the window reference
        },
        // Action to close the window
        closeWindow: (state) => {
            state.isOpen = 0; // Set the state to closed
            state.windowRef = null; // Clear the window reference
        },
    },
});

// Export actions for use in components
export const { openWindow, closeWindow } = windowSlice.actions;

// Selector to access the open/closed state
export const selectWindowState = (state) => state.window.isOpen;
// Selector to access the window reference
export const selectWindowRef = (state) => state.window.windowRef;

// Default export of the reducer
export default windowSlice.reducer;
