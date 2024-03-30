import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { getAllQiita } from './Qiita.tsx';
import ItemList from './components/QiitaList/QiitaList.tsx';
import ItemDetail from './components/ItemDetail/ItemDetail.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import { initialURL } from './environment/InitialURL.tsx';
import './App.css';

interface QiitaItem {
  id: string;
  title: string;
  body: string;
}

function App(): JSX.Element {
  const [qiitaData, setQiitaData] = useState<QiitaItem[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const fetchQiitaData = async () => {
      try {
        const res: any = await getAllQiita(initialURL);
        setQiitaData(res);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchQiitaData();
  }, []);

  const handleSubmitApiKey = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log('API Key:', apiKey);
    try {
      if (!apiKey) {
        console.error('API Key is required.');
        return;
      }
      const res: any = await getAllQiita(`${initialURL}?access_token=${apiKey}`);
      setQiitaData(res);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
          <div className="qiitaCardContainer">
            <form onSubmit={handleSubmitApiKey}>
              <input
                className="ApiKey"
                type="text"
                placeholder="Enter API Key"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
              />
              <button type="submit">Search</button>
            </form>
            <Routes>
              <Route path="/" element={<ItemList Items={qiitaData} />} />
              <Route path="/detail/:id" element={<ItemDetail />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;


