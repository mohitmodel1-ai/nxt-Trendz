import { Routes,BrowserRouter,Route} from 'react-router'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import Saved from './components/Saved'
import VideoDetails from './components/VideoDetails'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useContext } from 'react'
import { AppContext } from './components/Context'
const App = () => {
  const {authenticated} = useContext(AppContext)
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<ProtectedRoute auth={authenticated}>
          <Home/>
        </ProtectedRoute>}/>
        <Route path='/trending' element={<ProtectedRoute auth={authenticated}>
          <Trending/>
        </ProtectedRoute>}/>
        <Route path='/gaming' element={<ProtectedRoute auth={authenticated}>
          <Gaming/>
        </ProtectedRoute>}/>
        <Route path='/saved' element={<ProtectedRoute auth={authenticated}>
          <Saved/>
        </ProtectedRoute>}/>
        <Route path='/videos/:id' element={<ProtectedRoute auth={authenticated}>
          <VideoDetails/>
        </ProtectedRoute>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
