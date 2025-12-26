// Логика административной панели

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initCharts();
    initQueries();
});

// Инициализация вкладок
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок и контента
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и соответствующему контенту
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Обновляем графики при переключении на вкладку статистики
            if (tabId === 'statistics') {
                updateStats();
            }
        });
    });
}

// Инициализация графиков
function initCharts() {
    // График пассажиров
    const passengersCtx = document.getElementById('passengersChart').getContext('2d');
    window.passengersChart = new Chart(passengersCtx, {
        type: 'bar',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            datasets: [{
                label: 'Количество пассажиров',
                data: [1200, 1900, 1500, 2200, 1800, 2500, 3000, 2800, 2600, 2400, 2100, 2300],
                backgroundColor: 'rgba(26, 95, 180, 0.7)',
                borderColor: 'rgba(26, 95, 180, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // График доходов
    const incomeCtx = document.getElementById('incomeChart').getContext('2d');
    window.incomeChart = new Chart(incomeCtx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            datasets: [{
                label: 'Доход (тыс. руб.)',
                data: [450, 620, 580, 720, 650, 800, 950, 900, 870, 820, 750, 780],
                backgroundColor: 'rgba(38, 162, 105, 0.2)',
                borderColor: 'rgba(38, 162, 105, 1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Обновление статистики
function updateStats() {
    const period = document.getElementById('statsPeriod').value;
    const route = document.getElementById('statsRoute').value;
    
    // В реальном приложении здесь будет запрос к серверу
    // Для демонстрации обновляем данные вручную
    
    let totalPassengers, totalIncome, avgLoad, completedFlights;
    
    if (route === 'all') {
        totalPassengers = 25400;
        totalIncome = "9,850,000";
        avgLoad = "78%";
        completedFlights = 520;
    } else if (route === 'msk-spb') {
        totalPassengers = 8500;
        totalIncome = "3,400,000";
        avgLoad = "85%";
        completedFlights = 180;
    } else if (route === 'msk-kzn') {
        totalPassengers = 6200;
        totalIncome = "2,300,000";
        avgLoad = "72%";
        completedFlights = 130;
    } else {
        totalPassengers = 4500;
        totalIncome = "1,650,000";
        avgLoad = "68%";
        completedFlights = 95;
    }
    
    // Обновляем сводную статистику
    document.getElementById('totalPassengers').textContent = totalPassengers.toLocaleString();
    document.getElementById('totalIncome').textContent = totalIncome + " руб.";
    document.getElementById('avgLoad').textContent = avgLoad;
    document.getElementById('completedFlights').textContent = completedFlights;
    
    // Обновляем графики в зависимости от периода
    updateCharts(period, route);
}

// Обновление графиков
function updateCharts(period, route) {
    // В реальном приложении здесь будет загрузка новых данных с сервера
    // Для демонстрации просто меняем подписи
    
    let labels, passengerData, incomeData;
    
    if (period === 'day') {
        labels = ['1', '2', '3', '4', '5', '6', '7'];
        passengerData = [120, 150, 130, 180, 160, 200, 190];
        incomeData = [45000, 58000, 52000, 68000, 62000, 75000, 72000];
    } else if (period === 'week') {
        labels = ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'];
        passengerData = [850, 920, 780, 890];
        incomeData = [320000, 350000, 300000, 340000];
    } else if (period === 'month') {
        labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        passengerData = [1200, 1900, 1500, 2200, 1800, 2500, 3000, 2800, 2600, 2400, 2100, 2300];
        incomeData = [450, 620, 580, 720, 650, 800, 950, 900, 870, 820, 750, 780];
    } else {
        labels = ['2019', '2020', '2021', '2022', '2023'];
        passengerData = [18000, 15000, 22000, 24000, 25400];
        incomeData = [6500, 5500, 7800, 8900, 9850];
    }
    
    // Обновляем графики
    window.passengersChart.data.labels = labels;
    window.passengersChart.data.datasets[0].data = passengerData;
    window.passengersChart.update();
    
    window.incomeChart.data.labels = labels;
    window.incomeChart.data.datasets[0].data = incomeData;
    window.incomeChart.update();
}

// Инициализация системы запросов
function initQueries() {
    changeQueryType();
}

// Изменение типа запроса
function changeQueryType() {
    const queryType = document.getElementById('queryType').value;
    const queryParams = document.getElementById('queryParams');
    
    let html = '';
    
    switch(queryType) {
        case 'seats':
            html = `
                <div class="form-group">
                    <label for="flightNumber">Номер рейса:</label>
                    <input type="text" id="flightNumber" placeholder="Например: МСК-СПБ-101">
                </div>
                <div class="form-group">
                    <label for="flightDate">Дата рейса:</label>
                    <input type="date" id="flightDate">
                </div>
            `;
            break;
            
        case 'passengers':
        case 'income':
            html = `
                <div class="form-group">
                    <label for="completedFlight">Номер выполненного рейса:</label>
                    <input type="text" id="completedFlight" placeholder="Например: МСК-СПБ-101">
                </div>
                <div class="form-group">
                    <label for="completedDate">Дата выполнения:</label>
                    <input type="date" id="completedDate">
                </div>
            `;
            break;
            
        case 'list':
            html = `
                <div class="form-group">
                    <label for="listFlight">Номер рейса:</label>
                    <input type="text" id="listFlight" placeholder="Например: МСК-СПБ-101">
                </div>
                <div class="form-group">
                    <label for="listDate">Дата рейса:</label>
                    <input type="date" id="listDate">
                </div>
            `;
            break;
            
        case 'search':
            html = `
                <div class="form-group">
                    <label for="passengerSurname">Фамилия пассажира:</label>
                    <input type="text" id="passengerSurname" placeholder="Например: Иванов">
                </div>
                <div class="form-group">
                    <label for="searchDate">Дата поездки (необязательно):</label>
                    <input type="date" id="searchDate">
                </div>
            `;
            break;
    }
    
    queryParams.innerHTML = html;
}

// Выполнение запроса
function executeQuery() {
    const queryType = document.getElementById('queryType').value;
    const queryResults = document.getElementById('queryResults');
    
    // В реальном приложении здесь будет запрос к серверу
    // Для демонстрации показываем тестовые результаты
    
    let resultsHTML = '';
    
    switch(queryType) {
        case 'seats':
            resultsHTML = `
                <h4>Результат запроса: Наличие свободных мест</h4>
                <div class="query-result-details">
                    <p><strong>Рейс:</strong> МСК-СПБ-101</p>
                    <p><strong>Дата:</strong> 20.10.2023</p>
                    <p><strong>Маршрут:</strong> Москва - Санкт-Петербург</p>
                    <p><strong>Автобус:</strong> Мерседес Туристо (50 мест)</p>
                    <p><strong>Свободных мест:</strong> 12</p>
                    <p><strong>Занятых мест:</strong> 38</p>
                </div>
            `;
            break;
            
        case 'passengers':
            resultsHTML = `
                <h4>Результат запроса: Количество пассажиров выполненного рейса</h4>
                <div class="query-result-details">
                    <p><strong>Рейс:</strong> МСК-КЗН-205</p>
                    <p><strong>Дата выполнения:</strong> 15.10.2023</p>
                    <p><strong>Маршрут:</strong> Москва - Казань</p>
                    <p><strong>Количество пассажиров:</strong> 42</p>
                    <p><strong>Вместимость автобуса:</strong> 50 мест</p>
                    <p><strong>Загрузка рейса:</strong> 84%</p>
                </div>
            `;
            break;
            
        case 'income':
            resultsHTML = `
                <h4>Результат запроса: Доходность рейса</h4>
                <div class="query-result-details">
                    <p><strong>Рейс:</strong> МСК-НН-156</p>
                    <p><strong>Дата выполнения:</strong> 12.10.2023</p>
                    <p><strong>Маршрут:</strong> Москва - Нижний Новгород</p>
                    <p><strong>Количество пассажиров:</strong> 38</p>
                    <p><strong>Стоимость билета:</strong> 1,800 руб.</p>
                    <p><strong>Общий доход:</strong> 68,400 руб.</p>
                    <p><strong>Расходы на рейс:</strong> 45,000 руб.</p>
                    <p><strong>Прибыль:</strong> 23,400 руб.</p>
                </div>
            `;
            break;
            
        case 'list':
            resultsHTML = `
                <h4>Результат запроса: Список пассажиров рейса</h4>
                <div class="query-result-details">
                    <p><strong>Рейс:</strong> МСК-СПБ-101</p>
                    <p><strong>Дата:</strong> 20.10.2023</p>
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>ФИО</th>
                                <th>Место</th>
                                <th>Телефон</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Иванов Иван Иванович</td>
                                <td>12</td>
                                <td>+7 (XXX) XXX-XX-01</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Петрова Мария Сергеевна</td>
                                <td>15</td>
                                <td>+7 (XXX) XXX-XX-02</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Сидоров Алексей Петрович</td>
                                <td>21</td>
                                <td>+7 (XXX) XXX-XX-03</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><strong>Всего пассажиров:</strong> 38</p>
                </div>
            `;
            break;
            
        case 'search':
            resultsHTML = `
                <h4>Результат запроса: Поиск билетов по фамилии</h4>
                <div class="query-result-details">
                    <p><strong>Фамилия:</strong> Иванов</p>
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>ФИО</th>
                                <th>Рейс</th>
                                <th>Дата</th>
                                <th>Место</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Иванов Иван Иванович</td>
                                <td>МСК-СПБ-101</td>
                                <td>20.10.2023</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Иванова Анна Петровна</td>
                                <td>МСК-КЗН-205</td>
                                <td>15.10.2023</td>
                                <td>08</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Иванов Сергей Алексеевич</td>
                                <td>СПБ-МСК-102</td>
                                <td>18.10.2023</td>
                                <td>22</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><strong>Всего найденных билетов:</strong> 3</p>
                </div>
            `;
            break;
    }
    
    queryResults.innerHTML = resultsHTML;
}

// Функции для управления БД (демонстрационные)
function showTables() {
    alert("Показана структура таблиц базы данных. В реальном приложении здесь будет отображение схемы БД.");
}

function addRecord() {
    const table = document.getElementById('tableSelect').value;
    if (!table) {
        alert("Выберите таблицу для добавления записи");
        return;
    }
    alert(`Добавление записи в таблицу: ${table}. В реальном приложении откроется форма для ввода данных.`);
}

function editRecord() {
    const table = document.getElementById('tableSelect').value;
    if (!table) {
        alert("Выберите таблицу для редактирования записи");
        return;
    }
    alert(`Редактирование записи в таблице: ${table}. В реальном приложении откроется форма с выбранной записью.`);
}

function deleteRecord() {
    const table = document.getElementById('tableSelect').value;
    if (!table) {
        alert("Выберите таблицу для удаления записи");
        return;
    }
    if (confirm(`Вы уверены, что хотите удалить запись из таблицы: ${table}?`)) {
        alert(`Запись удалена из таблицы: ${table}. В реальном приложении будет отправлен запрос к БД.`);
    }
}

function archiveOldData() {
    if (confirm("Архивировать старые рейсы (старше 6 месяцев)?")) {
        alert("Архивация запущена. В реальном приложении будет выполнено перемещение данных в архивную БД.");
    }
}

function backupDatabase() {
    alert("Создание резервной копии БД. В реальном приложении будет сгенерирован SQL-дамп базы данных.");
}

// Функции для модерации отзывов
function approveFeedback(button) {
    const item = button.closest('.mod-feedback-item');
    alert("Отзыв одобрен и опубликован. В реальном приложении запись будет перемещена в таблицу опубликованных отзывов.");
    item.remove();
}

function editFeedback(button) {
    alert("Редактирование отзыва. В реальном приложении откроется форма для редактирования текста отзыва.");
}

function rejectFeedback(button) {
    const item = button.closest('.mod-feedback-item');
    if (confirm("Отклонить этот отзыв? Он не будет опубликован.")) {
        alert("Отзыв отклонен. В реальном приложении запись будет помечена как отклоненная.");
        item.remove();
    }
}

// Добавление стилей для таблиц результатов
const tableStyles = document.createElement('style');
tableStyles.textContent = `
    .result-table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
    }
    
    .result-table th, .result-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    
    .result-table th {
        background-color: #f2f2f2;
        font-weight: 600;
    }
    
    .result-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    
    .query-result-details {
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 5px;
        margin-top: 15px;
    }
    
    .query-result-details p {
        margin-bottom: 8px;
    }
`;

document.head.appendChild(tableStyles);