function loadService(serviceName) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';  // Очистить текущее содержимое

    if (serviceName === 'tracker') {

         const createButton = document.createElement('button');
        createButton.className = 'btn btn-primary mb-3';
        createButton.textContent = 'Создать задачу';
        createButton.setAttribute('data-bs-toggle', 'modal');
        createButton.setAttribute('data-bs-target', '#createTaskModal');
        contentDiv.appendChild(createButton);

        fetch('/api/issues/')  // Убедитесь, что URL верный
            .then(response => response.json())
            .then(data => {
                const table = document.createElement('table');
                table.className = 'tasks-table';

                // Заголовки таблицы
                const thead = document.createElement('thead');
                table.appendChild(thead);
                const headerRow = document.createElement('tr');
                thead.appendChild(headerRow);

                const headers = ['Задача', 'Описание', 'Исполнитель', 'Статус'];
                headers.forEach(headerText => {
                    const header = document.createElement('th');
                    header.textContent = headerText;
                    headerRow.appendChild(header);
                });

                // Тело таблицы
                const tbody = document.createElement('tbody');
                table.appendChild(tbody);

                data.issues.forEach(issue => {
                    const row = document.createElement('tr');
                    tbody.appendChild(row);

                    const summaryCell = document.createElement('td');
                    summaryCell.textContent = issue.summary;
                    row.appendChild(summaryCell);

                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = issue.description || 'No description';
                    row.appendChild(descriptionCell);

                    const assigneeCell = document.createElement('td');
                    assigneeCell.textContent = issue.assignee ? issue.assignee.name : 'Unassigned';
                    row.appendChild(assigneeCell);

                    const statusCell = document.createElement('td');
                    statusCell.textContent = issue.status.display;
                    row.appendChild(statusCell);
                });

                contentDiv.appendChild(table);
            })
            .catch(error => {
                console.error('Ошибка загрузки данных таск-трекера:', error);
                contentDiv.textContent = 'Error loading data.';
            });
    } else if (serviceName === 'service2') {
        contentDiv.textContent = 'Содержимое для Сервиса 2';
    }
}


function createTask() {
    const summary = document.getElementById('taskSummary').value;
    const description = document.getElementById('taskDescription').value;

    fetch('/api/create-issue/', {  // Предполагается, что у вас есть такой endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ summary: summary, description: description })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
    .then(data => {
        console.log('Task created:', data);
        // Закрыть модальное окно
        $('#createTaskModal').modal('hide');
        // Очистка формы
        document.getElementById('taskForm').reset();
        // Можно добавить код для обновления таблицы или уведомления пользователя
    })
    .catch(error => {
        console.error('Error creating task:', error);
    });
}