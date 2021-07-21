const NoteForm = ({addNote,newNote,setNewNote}) => {
    return ( 
        <div>
            <h2>Add a Note</h2>
            <form onSubmit={addNote}>
      <input
        type='text'
        value={newNote}
        name='note'
        onChange={({target})=>setNewNote(target.value)}
      />
      <button type="submit">save</button>
    </form>  
        </div>
     );
}
 
export default NoteForm;