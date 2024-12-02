// App.jsx
import './App.css';
import { useGlobalContext } from './context';
import SearchBar from './Components/SearchBar';
import { useEffect, useState } from 'react';
import PageNo from './Components/PageNo';
import RemovePost from './Components/RemovePost';

function App() {


  const { info, error } = useGlobalContext(); // Use context values

  const [message, setmessage] = useState('NO RESULT FOUND');
  const [messageDisplay, setmessageDisplay] = useState(false);

  if (error) {
    return <div>Error: {error}</div>; // Display error if it occurs
  }
  console.log(info);



  useEffect(() => {
    setmessageDisplay(false);
    const timer = setTimeout(() => {
      if (info.length === 0) {
        setmessageDisplay(true);
      }

    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer if the data is fetched before the timeout
    return () => clearTimeout(timer);
  }, [info]);

  return (
    <div>
      <SearchBar />
      <PageNo />
      {messageDisplay && <div className="message">{message}</div>}
      {!messageDisplay && info.length > 0 && message ? (
        info.map((hit) => (
          <div key={hit.objectID} className="title-container">
            <div className="title">{hit.title}</div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <RemovePost  id={hit.objectID} />
              <a href={hit.url || hit.story_url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
              <span className="author">{hit.author}</span>
              <span className="points">{hit.points} points</span>
            </div>



          </div>
        ))
      ) : (

        !messageDisplay && <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
