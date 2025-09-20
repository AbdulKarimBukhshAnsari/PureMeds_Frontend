import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Home from "./views/Home/Home";
function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-back">
        <Header />
        <main className="flex-grow">
          <Home />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
