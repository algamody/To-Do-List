$(document).ready(function () {

    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); // منع الإرسال التلقائي

        let email = $('#floatingInput').val().trim();
        let password = $('#floatingPassword').val();

        // تحقق من البريد الإلكتروني باستخدام RegEx
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert('يرجى إدخال بريد إلكتروني صالح.');
            return;
        }

        if (password.length < 6) {
            alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل.');
            return;
        }

        // إذا التحقق ناجح

        if (email === 'admin@project.ly' && password === '12345678') {
            alert('تم تسجيل الدخول بنجاح');
            window.location.href = 'main.html';
            return;
        }
        else {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
            return;
        }

        // يمكنك إرسال النموذج باستخدام AJAX أو this.submit()
    });


    
});
