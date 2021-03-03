import { FC } from "react"
import { AppContextProvider } from "./store"
import Main from "./views/Main"
// In this application i will use React Context for store, because it's small


const App:FC = () => {
	return (
    <AppContextProvider>
      <div className='App'>
        <Main />
      </div>
    </AppContextProvider>
	)
}

export default App
