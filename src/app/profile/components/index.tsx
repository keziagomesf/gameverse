"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiX, FiTrash2 } from "react-icons/fi";
import { GameProps } from "@/utils/types/game";

export function FavoriteCard() {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [savedGame, setSavedGame] = useState("");
  const [selectedGame, setSelectedGame] = useState('');
  const [gameList, setGameList] = useState<GameProps[]>([]);


  useEffect(() => {
    async function loadGames() {
      try {
        const response = await fetch(`https://sujeitoprogramador.com/next-api/?api=games`);
        const text = await response.text(); 
        const data = JSON.parse(text) 
        setGameList(data);
      } catch (error) {
        console.error("Erro ao buscar jogos", error);
      }
    }
      loadGames()
    
    const storedGame = localStorage.getItem("favoriteGame");
    if (storedGame) {
      setSavedGame(storedGame);
    }
  }, []);

  function handleSave() {
    if (selectedGame.trim() === "") return;

    localStorage.setItem("favoriteGame", selectedGame);
    setSavedGame(selectedGame);
    setInput("");
    setShowInput(false);
  }

  function handleCancel() {
    setInput("");
    setShowInput(false);
  }

  function handleDelete() {
    localStorage.removeItem("favoriteGame");
    setSavedGame("");
    setInput("");
    setShowInput(false);
  }

  return (
    <div className="w-full bg-gray-500 p-4 text-white rounded-lg flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-sm">Jogo Favorito:</span>
            <p className="font-bold">{savedGame || "Nenhum"}</p>
          </div>
        </div>

        <div>
          {showInput ? (
            <button onClick={() => setShowInput(false)} title="Cancelar">
              <FiX size={20} />
            </button>
          ) : (
            <button onClick={() => setShowInput(true)} title="Editar">
              <FiEdit size={20} />
            </button>
          )}
        </div>
      </div>

      {showInput && (
        <>
          <select className="text-black rounded p-1" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
            <option value="">Selecione um jogo</option>
             {gameList.map((game) => (
            <option key={game.id} value={game.title}>
              {game.title}
          </option>
          ))}
        </select>

          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded mt-2"
          >
            Salvar favorito
          </button>
        </>
      )}

      {savedGame && !showInput && (
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 text-sm text-bold"
        >
          <FiTrash2 />
          Remover jogo favorito
        </button>
      )}
    </div>
  );
}
