const NoteForm = ({addNote,newNote,setNewNote}) => {
    return ( 
        <div>
            <form onSubmit={addNote}>
      <input
        placeholder={newNote}
        type='text'
        name='note'
        onChange={({target})=>setNewNote(target.value)}
      />
      <button type="submit">save</button>
    </form>  
        </div>
     );
}
 
export default NoteForm;