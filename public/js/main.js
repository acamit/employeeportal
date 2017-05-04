(function () {

    //var init
    var $bodyContent, $liLogin, $liUser;

    //var initialization
    $bodyContent = $("#bodyContent"),
        $liLogin = $("#liLogin"),
        $liUser = $('#liUser');

    //functions
    function getInitData() {
        $liLogin.addClass('hidden');
        $liUser.addClass('hidden');

        $.ajax({
            url: '/init',
            method: 'GET',
            success: getInitDataSH
        });
    }


    function getInitDataSH(data) {
        if (data.isAuthenticated) {
            $liUser.removeClass('hidden');
        } else {
            $liLogin.removeClass('hidden');
        }

    }

    function handleHashChange() {
        switch (window.location.hash) {
            case "#notices":
                window.notices.handleHash(injectBodyContent);
                break;
            case "#issues":
                window.issues.handleHash(injectBodyContent);
                break;
            case "#employees":
                window.notices.handleHash(injectBodyContent);
                break;
            case "#login":
                window.login.handleHash(injectBodyContent);
                break;
            case "#logout":
               // window.logout.handleHash(injectBodyContent);
                break;
            default:
                break;
        }
    }

    function injectBodyContent(bodyContentHtml, afterInjectCB) {
        $bodyContent.html(bodyContentHtml);
        if (afterInjectCB != null) {
            afterInjectCB();
        }
    }

    function init() {
        window.notices.init();
        getInitData();
        $(window).on('hashchange', handleHashChange);
        handleHashChange();
    }

    //init call

    init();
})();