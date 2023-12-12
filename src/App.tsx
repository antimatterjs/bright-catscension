import './App.css';
import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import Header from '@/components/Header';
import Home from '@/routes/Home';
import Upload from '@/routes/Upload';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
});

function App() {
    return (
        <BrowserRouter basename='/'>
            <QueryClientProvider client={queryClient}>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="upload" element={<Upload />} />
                    </Routes>
                </main>
                <footer>
                    <small>Built by Jonathan Stevens in 2023 😺</small>
                </footer>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App;
