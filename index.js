$(document).ready(function () {
    // Login form handling (unchanged)
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        let email = $('#floatingInput').val().trim();
        let password = $('#floatingPassword').val();
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert('يرجى إدخال بريد إلكتروني صالح.');
            return;
        }

        if (password.length < 6) {
            alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل.');
            return;
        }

        if (email === 'admin@project.ly' && password === '12345678') {
            sessionStorage.setItem("isLoggedIn", "true");
            window.location.href = 'main.html';
            return;
        } else {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
            return;
        }
    });

    // Save and load tasks with scrollable container
    function saveTasks() {
        localStorage.setItem("tasks", $("#taskList").html());
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            $("#taskList").html(savedTasks);
            // Initialize tooltips for existing tasks
            $('[data-bs-toggle="tooltip"]').tooltip();
        }
    }

    loadTasks();

    // Add new task with scrollable container
    $("#addTask").click(function () {
        const taskText = $("#taskInput").val().trim();
        if (taskText) {
            const taskItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="task-text-container" data-bs-toggle="tooltip" title="${taskText}">
                        <span class="task-text">${taskText}</span>
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm me-1 complete-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                        </svg></button>

                        <button class="btn btn-danger btn-sm m-1 delete-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg></button>
                        
                        <button class="btn btn-secondary btn-sm m-1 edit-btn">✎</button>
                    </div>
                </li>
            `;
            $("#taskList").append(taskItem);
            $("#taskInput").val("");
            saveTasks();
            // Initialize tooltip for new task
            $('[data-bs-toggle="tooltip"]').tooltip();
        }
    });

    // Task completion toggle
    $("#taskList").on("click", ".complete-btn", function () {
        $(this).closest("li").find(".task-text").toggleClass("completed");
        saveTasks();
    });

    // Task deletion
    $("#taskList").on("click", ".delete-btn", function () {
        $(this).closest("li").remove();
        saveTasks();
    });

    // Task editing
    $("#taskList").on("click", ".edit-btn", function () {
        const taskText = $(this).closest("li").find(".task-text").text();
        const newTaskText = prompt("تعديل المهمة:", taskText);
        // Check if the user entered a new task text
        if (newTaskText !== null) {
            $(this).closest("li").find(".task-text").text(newTaskText);
            saveTasks();
        }
    });

    // Logout button
    $('#logout').on('click', function (e) {
        e.preventDefault();
        sessionStorage.setItem("isLoggedIn", "false");
        window.location.href = 'index.html';
    });

    // Theme switching (unchanged)
    $("#themeSwitch").on("change", function () {
        if (this.checked) {
            $("body")
                .removeClass("bg-light")
                .attr("data-bs-theme", "dark");
            localStorage.setItem("mode", "dark");
        } else {
            $("body")
                .addClass("bg-light")
                .attr("data-bs-theme", "light");
            localStorage.setItem("mode", "light");
        }
    });

    // Initialize theme
    if (localStorage.getItem("mode") === "dark") {
        $("body")
            .removeClass("bg-light")
            .attr("data-bs-theme", "dark");
        $("#themeSwitch").prop("checked", true);
    } else {
        $("body")
            .addClass("bg-light")
            .attr("data-bs-theme", "light");
        $("#themeSwitch").prop("checked", false);
    }
});
