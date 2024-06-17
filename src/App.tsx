import './App.scss'
import Nav from "./components/global/Nav.tsx";
import Speak from "./components/global/Speak.tsx";
import {Provider} from 'react-redux';
import store from "./store";
import Chats from "./components/global/Chats.tsx";

function App() {
    return (
        <Provider store={store}>
            <div id="app" className="bg-gray-100 flex justify-center h-screen">
                <main className="bg-white w-full  h-screen relative flex flex-col">
                    <Nav title="스타트업 vs 대기업 주제로 토론하기"/>
                    <Chats/>
                    <Speak/>
                </main>
            </div>
        </Provider>
    )
}

export default App
