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
            alert('تم تسجيل الدخول بنجاح');
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
                        <button class="btn btn-success btn-sm me-2 complete-btn">✓</button>
                        <button class="btn btn-danger btn-sm delete-btn">✗</button>
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

    // Logout button
    $('#logout').on('click', function (e) {
        e.preventDefault();
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
