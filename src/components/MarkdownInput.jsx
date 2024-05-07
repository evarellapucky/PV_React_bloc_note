import { useState} from "react";
import NoteDisplay from "./NoteDisplay";

//const reçoit une prop onTextAreaChange du parent App.
const MarkdownInput = ({onTextareaChange, onTitleChange, onNoteSave}) => {
  const [titleValue, setTitleValue] = useState('');
  // Définition de l'état markdownValue et de la fonction de mise à jour avec le hook useState
  const [markdownValue, setMarkdownValue] = useState(() => {
    // Récupérer les données du localStorage avec la clé "blocNote"
    const savedValue = JSON.parse(localStorage.getItem('blocNote'));
    // Retourner les données récupérées ou une chaîne vide si aucune donnée n'est trouvée
    return savedValue ? savedValue : '';
  });

  
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitleValue(newTitle);
    // Appeler la fonction de rappel fournie par le parent avec le nouveau titre en tant qu'argument
    onTitleChange(newTitle);
  };

  //fonction appelée à chaque modif du contenu textArea. Cette fonction met à jour l'état markdownValue avec la nouvelle valeur du textarea et appelle la fonction de rappel onTextareaChange avec la nouvelle valeur.
  const changeMarkdownValue = (event) => {
    //extrait la nouvelle valeur
    const newValue = event.target.value;
    //met à jour la valeur markdownValue avec la nouvelle valeur du textArea
    setMarkdownValue(newValue);
    // Appeler la fonction de rappel fournie par le parent avec la nouvelle valeur en tant qu'argument
    onTextareaChange(newValue);
  };

  

  const handleSave = () => {
    // Vérifier si le markdownValue n'est pas vide avant de sauvegarder
    if (markdownValue.trim() !== '' && titleValue.trim() !== '') {
      // Appeler la fonction de rappel fournie par le parent avec la nouvelle note
      onNoteSave(titleValue, markdownValue);
      // Réinitialiser la valeur du textarea après avoir enregistré la note
      setMarkdownValue('');
      setTitleValue('');
    }
  };

  return (
    <>  
    <div className="title__input">
      <input type="text" placeholder="Titre de la note" value={titleValue} onChange={handleTitleChange} />
    </div> 
    <div className="content__input">
      <textarea placeholder="Contenu de la note" value={markdownValue} onChange={changeMarkdownValue} />
    </div>
    <div>
      <button className='btn btn-primary' onClick={handleSave}>Enregistrer</button>
    </div>  
    <div>
    <NoteDisplay markdownValue={markdownValue} titleValue={titleValue} />
    </div>
    </>
  );
};

export default MarkdownInput;