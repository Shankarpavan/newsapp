import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function App() {
  return (
    <>
      <Header />
      <main className="news-main">
        <p className="eyebrow">{today}</p>
        <h1>News that gives you the full picture.</h1>
        <p className="intro">
          Clear reporting, thoughtful analysis, and stories worth your attention.
        </p>
      </main>
      <Footer />
    </>
  )
}

export default App