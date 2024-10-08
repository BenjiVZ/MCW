  import { saveTask, getTask, onGetTasks, deleteTask, getTasks, updateTask } from './app/firebase.js';
  
  const taskForm = document.getElementById('task-form');
  const taskContainer = document.getElementById('task-container');

  let editStatus = false;
  let id = '';

  window.addEventListener('DOMContentLoaded', async () =>{
    const querySnapshot = await getTask()
    onGetTasks((querySnapshot)=> {
      let html = "";

      querySnapshot.forEach(doc => {
        const task = doc.data()
        html += `
              <div>
                  <h3>${task.title}</h3>
                  <p>${task.description}</p>
                  <button class='btn-delete' data-id="${doc.id}">Delete</button>
                  <button class='btn-edit' data-id="${doc.id}">Edit</button>
              </div>
        `;
      });
  
  taskContainer.innerHTML = html ;

  const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
      btnsDelete.forEach(btn =>{
        btn.addEventListener('click', ({target: {dataset}}) => {
          deleteTask(dataset.id)
        })
      })


    const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
      btn.addEventListener('click', async (e) =>{
        const doc = await getTasks(e.target.dataset.id)
        const task = doc.data()

        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description

        editStatus = true;
        id= doc.id;

        taskForm['btn-task-save'].innerText = 'Update'
      })
    })
    });
  });

  taskForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const title = taskForm['task-title'];
    const description = taskForm['task-description'];

    if (!editStatus) {
      saveTask(title.value, description.value);
    } else {
      updateTask(id, {
        title: title.value, description: description.value
      });

      editStatus = false;
    }
    
    taskForm.reset()
  })