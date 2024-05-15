import './App.css';
import {useState} from 'react';

function App() {

  const [newGame, setNewGame] = useState(false);
  const [loadingNumero, setLoadingNumero] = useState(false);

  const [rispostaId, setId] = useState("");
  const [rispostaNum, setNum] = useState(2);
  const [rispostaTentativi, setTentativi] = useState(0);
  const [input, setInput] = useState(0);

  async function iniziaPartita(){
    setNewGame(true);
    const response = await fetch("http://localhost:8080/partita", {method: "POST"});
    const r = await response.json();
    setId(r.id);
    setNewGame(false);
  }

  async function invioNumero(){
    setLoadingNumero(true);
    const response = await fetch(`http://localhost:8080/partita/${rispostaId}`, 
      {
          method: "PUT",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({"numero": input})
      });
    const r = await response.json();
    setNum(r.risultato);
    setTentativi(r.tentativi);
    setLoadingNumero(false);
  }

  function gestisciInput(e){
    setInput(e.target.value);
  }

  return (

    <div className="App">

      <h1>Indovina Numero</h1>
      <div><button onClick={(iniziaPartita)}>Nuova Partita</button></div>

      {rispostaId === "" &&
        <></>
      }

      {rispostaId !== "" &&

          <>
              {newGame &&
                <>in caricamento...</>
              }

              {!newGame &&
                  <>
                      <div>
                          <p>ID: {rispostaId}</p>
                          <p>Tenatativi: {rispostaTentativi}</p>
                      </div>

                      <div>
                        <p>Inserisci un numero tra 1 e 100</p>
                        <input type="number" value={input} onclick={invioNumero} onInput={gestisciInput}></input>
                        <button onClick={invioNumero}>Invia</button>

                      </div>

                      {loadingNumero &&
                        <>in caricamento...</>
                      }

                      {!loadingNumero &&
                        <>

                            {rispostaNum === 2 &&
                              <></>
                            }
                            {rispostaNum === 0 &&
                              <p>Risposta Giusta</p>
                            }
                            {rispostaNum === 1 &&
                              <p>Il numero è troppo grande</p>
                            }
                            {rispostaNum === -1 &&
                              <p>Il numero è troppo piccolo</p>
                            }

                        </>
                      }

                  </>
              }
          </>

      }

      
    </div>

  );

}

export default App;