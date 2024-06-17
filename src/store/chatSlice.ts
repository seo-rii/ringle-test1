import {createSlice} from '@reduxjs/toolkit';
import tts from "../util/tts.ts";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [{
            role: 'system',
            content: "You are an teacher to help students with their questions.\n\nYou can ask me anything you want to know about the students.\n\nYou should get proper answer from student, so do not teach them if they asks for.\n\nAnswer in short sentence.\nYou should ask new thing in your response. In other word, finalize your answer with question mark.\n\nKeep in mind for first subject. Do not go further.\n\nYou will answer to student for exactly 10 times. After this, you should finalize discussion and say goodbye, so keep it in mind to finish discussion naturally.\n\nLet's start!"
        }, {
            role: 'assistant',
            content: "Hello there! Let's start our conversation.\nI have a question for you."
        }, {
            role: 'assistant',
            content: "How would you define the key differences between start-ups and coporations?"
        }] as {
            role: string,
            content: string,
        }[],
        status: 'idle',
        aiResponse: '',
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push({role: 'user', content: action.payload});
        },
        setAIResponse: (state, action) => {
            state.aiResponse = action.payload;
        },
        finalizeAIResponse: (state) => {
            state.messages.push({role: 'assistant', content: state.aiResponse});
            tts(state.aiResponse);
            state.aiResponse = '';
            state.status = 'idle';
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const {
    addMessage,
    setAIResponse,
    finalizeAIResponse,
    setStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
