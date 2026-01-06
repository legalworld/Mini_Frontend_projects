// 1. DOM selections
const inputBox = document.querySelector(".input");
const addButton = document.querySelector(".addBtn");
const notesListWrapper = document.querySelector(".notes-list-wrapper");
const errorMessageText = document.querySelector(".error-message-text");

// Global state
let currentEditedNoteId = null;

// 2. Helper functions
function getNotesFromStorage() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotesToStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// 3. Create DOM note item
function createNoteItem(note) {
  const li = document.createElement("li");
  li.dataset.id = note.id;

  const p = document.createElement("p");
  p.textContent = note.text;
  li.appendChild(p);

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "editBtn");
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("btn", "deleteBtn");
  li.appendChild(deleteBtn);

  return li;
}

// 4. Fetch all notes on load
function fetchAllNotes() {
  const notesList = getNotesFromStorage();

  notesList.forEach((note) => {
    const noteItem = createNoteItem(note);
    notesListWrapper.appendChild(noteItem);
  });
}

document.addEventListener("DOMContentLoaded", fetchAllNotes);

// 5. Add / Edit note
addButton.addEventListener("click", () => {
  const inputText = inputBox.value.trim();

  // Validation
  if (inputText.length === 0) {
    errorMessageText.textContent =
      "Input can not be empty! You must write some note to proceed.";
    return;
  }

  errorMessageText.textContent = "";

  const notesList = getNotesFromStorage();

  // ✨ EDIT MODE
  if (addButton.innerText === "Edit Note") {
    const noteIndex = notesList.findIndex(
      (note) => note.id === currentEditedNoteId
    );

    if (noteIndex !== -1) {
      notesList[noteIndex].text = inputText;

      const li = notesListWrapper.querySelector(
        `li[data-id="${currentEditedNoteId}"]`
      );
      li.querySelector("p").textContent = inputText;
    }

    saveNotesToStorage(notesList);

    addButton.innerText = "Add Note";
    inputBox.value = "";
    currentEditedNoteId = null;
    return;
  }

  // ✨ ADD MODE
  const newNote = {
    id: Date.now(),
    text: inputText,
  };

  notesList.push(newNote);
  saveNotesToStorage(notesList);

  const newNoteItem = createNoteItem(newNote);
  notesListWrapper.appendChild(newNoteItem);

  inputBox.value = "";
});

// 6. Edit / Delete using event delegation
function handleEditOrDeleteNote(event) {
  const li = event.target.closest("li");
  if (!li) return;

  const noteId = Number(li.dataset.id);
  const notesList = getNotesFromStorage();

  // DELETE
  if (event.target.innerText === "Delete") {
    const updatedNotes = notesList.filter((note) => note.id !== noteId);

    saveNotesToStorage(updatedNotes);
    notesListWrapper.removeChild(li);
  }

  // EDIT
  if (event.target.innerText === "Edit") {
    const note = notesList.find((note) => note.id === noteId);
    if (!note) return;

    inputBox.value = note.text;
    inputBox.focus();

    addButton.innerText = "Edit Note";
    currentEditedNoteId = noteId;
  }
}

notesListWrapper.addEventListener("click", handleEditOrDeleteNote);
