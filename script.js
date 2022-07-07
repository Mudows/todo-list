// CARREGANDO LISTA SALVA EM LOCALSTORAGE
window.onload = function () {
  if (localStorage.length > 0) {
    const taskList = document.getElementById('lista-tarefas');
    taskList.innerHTML = localStorage.getItem('list');
    const listItems = document.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i += 1) {
      listItems[i].addEventListener('click', selectTask);
      listItems[i].addEventListener('dblclick', taskComplete);
    }
  }
};

// ADICIONA O EVENTO DE ADICIONAR TAREFA (addTask) AO BOTÃO DE CRIAR TAREFA.
$('#criar-tarefa').on('click', addTask);
$('#texto-tarefa').on('keydown', (event) => {
  const key = event.code;
  if (key === 'Enter') addTask();
});

// ADICIONA UMA NOVA TAREFA À LISTA.
function addTask() {
  const taskList = document.getElementById('lista-tarefas');
  const inputContent = document.getElementById('texto-tarefa').value;
  const createTaskItem = document.createElement('li');

  // Se o campo estiver vazio, retorna uma mensagem de erro.
  if (inputContent === '') {
    alert('Campo vazio. Nennuma tarefa criada.');
    return;
  }
  createTaskItem.innerText = inputContent;
  createTaskItem.addEventListener('click', selectTask); // Seleciona o item.
  createTaskItem.addEventListener('dblclick', taskComplete); // Completa a tarefa
  taskList.appendChild(createTaskItem);
  // Por algum motivo, usar inputContent aqui para apagar o valor do campo não funciona adequadamente. Por isso chamei o campo diretamente.
  document.getElementById('texto-tarefa').value = '';
}

// ESTA FUNÇÃO COLORE O ELEMENTO CLICADO DE CINZA E GARANTE QUE APENAS UM DOS ITENS DA LISTA ESTEJA COM O FUNDO CINZA.
function selectTask(event) {
  $('li').removeClass('selected')
  event.target.classList.add('selected')
  /* const nTasks = document.getElementsByTagName('li');
  for (let i = 0; i < nTasks.length; i += 1) {
    nTasks[i].style.backgroundColor = '';
    nTasks[i].style.color = '';
  }
  event.target.style.backgroundColor = 'gray';
  event.target.style.color = 'white'; */
}

// FUNÇÃO QUE RISCA A TAREFA MARCANDO-A COMO COMPLETA, OU DESMARCA.
function taskComplete(event) {
  event.target.classList.toggle('completed');
}

// CONFIGURA O BOTÃO QUE APAGA A LISTA
document.getElementById('apaga-tudo').addEventListener('click', clearAll);

function clearAll() {
  const nTasks = document.getElementsByTagName('li');
  for (let i = nTasks.length; i != 0; i -= 1) {
    document
      .getElementById('lista-tarefas')
      .removeChild(document.getElementById('lista-tarefas').firstChild);
  }
  localStorage.clear();
}

// CONFIGURA O BOTÃO DE LIMPAR TAREFAS FINALIZADAS
document
  .getElementById('remover-finalizados')
  .addEventListener('click', clearCompleted);

function clearCompleted(event) {
  const toRemove = document.getElementsByClassName('completed');
  while (toRemove.length > 0) {
    toRemove[0].remove();
  }
}

// SALVANDO A LISTA EM UM LOCALSTORAGE
document.getElementById('salvar-tarefas').addEventListener('click', saveList);

function saveList() {
  const listToSave = document.getElementById('lista-tarefas');
  localStorage.setItem('list', listToSave.innerHTML);
}

// BOTÕES DE MOVER ITENS DA LISTA
document.getElementById('mover-cima').addEventListener('click', moveItemUp);
document.getElementById('mover-baixo').addEventListener('click', moveItemDown);

// Move item selecionado para cima.
function moveItemUp() {
  const mainList = document.getElementById('lista-tarefas');
  const listItens = mainList.getElementsByTagName('li');
  for (let i = 1; i < listItens.length; i += 1) {
    if (listItens[i].classList.contains('selected')) {
      mainList.insertBefore(listItens[i], listItens[i - 1]);
      return;
    }
  }
}

// Move item selecionado para baixo.
function moveItemDown() {
  const mainList = document.getElementById('lista-tarefas');
  const listItens = mainList.getElementsByTagName('li');
  for (let i = 0; i < listItens.length - 1; i += 1) {
    if (listItens[i].classList.contains('selected')) {
      mainList.insertBefore(listItens[i + 1], listItens[i]);
      return;
    }
  }
}

// BOTÃO REMOVER SELECIONADO
document
  .getElementById('remover-selecionado')
  .addEventListener('click', removeSelected);

function removeSelected() {
  const toRemove = document.getElementsByTagName('li');
  for (let i = 0; i < toRemove.length; i += 1) {
    if (toRemove[i].classList.contains('selected')) {
      toRemove[i].remove();
      return;
    }
  }
  alert('Nada selecionado para remover.');
}
