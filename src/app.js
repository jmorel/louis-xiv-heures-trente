(function (){
    var clock = document.getElementById('clock');
    var ctx = clock.getContext("2d");

    var $imageTitle = $('#image-title');

    // debug mode
    var DEBUG = false;
    var $hourSelect = $("#debug-hour");
    var $widthInput = $("#debug-width");
    var $heightSpan = $("#debug-height");
    var $xPositionInput = $("#debug-x");
    var $yPositionInput = $("#debug-y");

    var resetDebug = function () {
        var image = images[$hourSelect.val()];
        if (!image.img) {
            image.img = new Image();
            image.img.onload = function () {
                resetDebug();
            };
            image.img.src = image.source;
        } else {
            $widthInput.val(image.width);
            updateHeight();
            $xPositionInput.val(image.position.x);
            $yPositionInput.val(image.position.y);
        }
    };

    var updateHeight = function () {
        var image = images[$hourSelect.val()];
        $heightSpan.text(Math.round(image.img.height * parseFloat($widthInput.val()) / image.img.width));
    };

    var enableDebug = function (debugHour) {
        DEBUG = true;
        if (debugHour) {
            $hourSelect.val(debugHour % 12);
        } else {
            var now = new Date();
            $hourSelect.val(now.getHours() % 12);
        }
        resetDebug();
        $hourSelect.on('change', resetDebug);
        $widthInput.on('change', updateHeight);
        $('#debug').show();
    };

    var disableDebug = function () {
        DEBUG = false;
        $('#debug').hide();
    };

    // clock
    var images = [{
        source: 'img/12.jpg',
        position: {
            x: -105,
            y: -50
        },
        width: 400,
        title: 'Saint Jean-Baptiste, Léonard de Vinci, 1513-1516',
        url: 'https://fr.wikipedia.org/wiki/Saint_Jean-Baptiste_(L%C3%A9onard_de_Vinci)'
    }, {
        source: 'img/1.jpg',
        position: {
            x: 110,
            y: -20
        },
        width: 600,
        title: 'La comête de Halley sur la Tapisserie de Bayeux, 1066-1082',
        url: 'https://fr.wikipedia.org/wiki/Tapisserie_de_Bayeux'
    }, {
        source: 'img/2.jpg',
        position: {
            x: 60,
            y: 33
        },
        width: 700,
        title: 'Bacchus, Léonard de Vinci, 1510-1515',
        url: 'https://fr.wikipedia.org/wiki/Bacchus_(L%C3%A9onard_de_Vinci)'
    }, {
        source: 'img/3.jpg',
        position: {
            x: 74,
            y: -121
        },
        width: 1000,
        title: 'Gabrielle d\'Estrées et une de ses soeurs, artiste inconnu, 1594-1595',
        url: 'https://fr.wikipedia.org/wiki/Gabrielle_d%27Estr%C3%A9es_et_une_de_ses_s%C5%93urs'
    }, {
        source: 'img/4.jpg',
        position: {
            x: -80,
            y: 80
        },
        width: 500,
        title: 'Louis XIV à l\'âge de 10 ans, Henri Testelin, 1648',
        url: 'https://fr.wikipedia.org/wiki/Henri_Testelin'
    }, {
        source: 'img/5.jpg',
        position: {
            x: -70,
            y: 100
        },
        width: 400,
        title: 'Louis XVIII en costume de sacre, Robert Lefèvre, 1822',
        url: 'https://fr.wikipedia.org/wiki/Robert_Lef%C3%A8vre'
    }, {
        source: 'img/6.jpg',
        position: {
            x: 5,
            y: 80
        },
        width: 520,
        title: 'Henri IV vainqueur de la Ligue représenté en Mars, Jacob Bunel, 1605-1606',
        url: 'https://fr.wikipedia.org/wiki/Henri_IV_(roi_de_France)'
    }, {
        source: 'img/7.jpg',
        position: {
            x: 30,
            y: -30
        },
        width: 350,
        title: 'Marguerite de Sève, Nicolas de Largillière',
        url: 'https://en.wikipedia.org/wiki/Nicolas_de_Largilli%C3%A8re'
    }, {
        source: 'img/8.jpg',
        position: {
            x: 60,
            y: 40
        },
        width: 500,
        title: 'Cardinal de Richelieu, Philippe de Champaigne, 1633-1640',
        url: 'https://fr.wikipedia.org/wiki/Armand_Jean_du_Plessis_de_Richelieu'
    }, {
        source: 'img/9.jpg',
        position: {
            x: -80,
            y: 21
        },
        width: 1200,
        title: 'La création d\'Adam, Michel-Ange, 1508-1512',
        url: 'https://fr.wikipedia.org/wiki/La_Cr%C3%A9ation_d%27Adam_(Michel-Ange)'
    }, {
        source: 'img/10.jpg',
        position: {
            x: 20,
            y: 100
        },
        width: 400,
        title: 'Autoportrait en Allégorie de la peinture, Artemisia Gentileschi, 1638-1939',
        url: 'https://fr.wikipedia.org/wiki/Artemisia_Gentileschi'
    }, {
        source: 'img/11.jpg',
        position: {
            x: -70,
            y: 100
        },
        width: 500,
        title: 'Bonaparte franchissant le Grand-Saint-Bernard, Jacques-Louis David, 1801',
        url: 'https://fr.wikipedia.org/wiki/Bonaparte_franchissant_le_Grand-Saint-Bernard'
    }];

    var center = {x: 300, y: 300};
    var radius = 250;

    var drawImage = function (now) {
        var image = images[DEBUG ? $('#debug-hour').val() : now.getHours() % 12];
        if (!image.img) {
            image.img = new Image();
            image.img.src = image.source;
        }
        if (DEBUG) {
            ctx.drawImage(image.img,
                    center.x + parseFloat($xPositionInput.val()) - parseFloat($widthInput.val()) / 2,
                    center.y + parseFloat($yPositionInput.val()) - parseFloat($heightSpan.text()) / 2,
                    $widthInput.val(),
                    $heightSpan.text());
        } else {
            image.height = image.img.height * image.width / image.img.width;
            ctx.drawImage(image.img,
                    center.x + image.position.x - image.width / 2,
                    center.y + image.position.y - image.height / 2,
                    image.width,
                    image.height);
        }
    };
    var drawClock = function (now) {
        // draw clock disk
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(236, 129, 9, 0.2)';
        ctx.fill();
        ctx.closePath();

        // 3 - 6 - 9 - 12
        for (var i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(
                    center.x + (radius - 30) * Math.cos(i * Math.PI / 2),
                    center.y + (radius - 30) * Math.sin(i * Math.PI / 2));
            ctx.lineTo(
                    center.x + (radius + 30) * Math.cos(i * Math.PI / 2),
                    center.y + (radius + 30) * Math.sin(i * Math.PI / 2));
            ctx.lineWidth = 14;
            ctx.strokeStyle = 'rgba(236, 129, 9, 1)';
            ctx.stroke();
            ctx.closePath();
        }

        // 1 - 2 - 4 - 5 - 7 - 8 - 10 - 11
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 3; j++) {
                ctx.beginPath();
                ctx.moveTo(
                        center.x + (radius - 50) * Math.cos((i * 3 + j) * Math.PI / 6),
                        center.y + (radius - 50) * Math.sin((i * 3 + j) * Math.PI / 6));
                ctx.lineTo(
                        center.x + (radius + 50) * Math.cos((i * 3 + j) * Math.PI / 6),
                        center.y + (radius + 50) * Math.sin((i * 3 + j) * Math.PI / 6));
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(236, 129, 9, 1)';
                ctx.stroke();
                ctx.closePath();
            }
        }

        // draw minutes
        for (var i = 0; i <= now.getMinutes(); i++) {
            ctx.beginPath();
            ctx.arc(
                    center.x + radius * Math.cos(i * 2 * Math.PI / 60 - Math.PI / 2),
                    center.y + radius * Math.sin(i * 2 * Math.PI / 60 - Math.PI / 2),
                    3,
                    0,
                    Math.PI * 2,
                    true);
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
        // draw seconds
        ctx.beginPath();
        var angle = (now.getSeconds() + now.getMilliseconds()/1000) * 2 * Math.PI / 60;
        ctx.arc(center.x, center.y, radius, -Math.PI / 2, angle - Math.PI / 2);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    };

    var drawTitle = function (now) {
        var image = images[DEBUG ? $('#debug-hour').val() : now.getHours() % 12];
        $imageTitle.attr('href', image.url);
        $imageTitle.html(image.title);
    };

    var clockWork = function () {
        var now = new Date();

        ctx.clearRect(0, 0, clock.width, clock.height);
        drawImage(now);
        drawClock(now);
        drawTitle(now);

        setTimeout(clockWork, 30);
    };

    var resizeClock = function () {
        clock.width = $(window).width();
        clock.height = $(window).height();
        center.x = Math.ceil(clock.width / 2);
        center.y = Math.ceil(clock.height / 2);

        // this margin leaves room for the title
        center.y -= 80;
    };

    $(window).on('resize', resizeClock);

    // init
    clockWork();
    resizeClock();

}());
