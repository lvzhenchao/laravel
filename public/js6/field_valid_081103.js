function requireFieldValid(hAEPe1, NLv6t4, h7m0Z3) {
    //var fET4c = hAEPe1;
    //var wSkdh3 = NLv6t4;
    var fET4c = $("#"+hAEPe1);
    var wSkdh3 = $("#"+NLv6t4);
    var qQ2rG3 = $.trim(fET4c.val()) != '';
    if (qQ2rG3) {
        wSkdh3.html("");
        //wSkdh3.css("display","none");
        //wSkdh3.attr("class", "hide");
        wSkdh3.hide();
    }
    else {
        wSkdh3.html(h7m0Z3);
        wSkdh3.css("display", "inline-block");
        wSkdh3.attr("class", "help-inline help-inline-error");
    }
    //wSkdh3.innerHTML = qQ2rG3 ? '' : h7m0Z3;
    //wSkdh3.style.display = qQ2rG3 ? 'none' : 'inline-block';
    //wSkdh3.className = qQ2rG3 ? 'hide' : 'help-inline help-inline-error';
    return qQ2rG3;
};
function compareFieldValid(hAEPe1, ZMXRF1, NLv6t4, h7m0Z3) {
    var fET4c = $1(hAEPe1);
    var fxn7q1 = $1(ZMXRF1);
    var wSkdh3 = $1(NLv6t4);
    var qQ2rG3 = fET4c.value.trim() == fxn7q1.value.trim();
    wSkdh3.innerHTML = qQ2rG3 ? '' : h7m0Z3;
    wSkdh3.style.display = qQ2rG3 ? 'none' : 'inline-block';
    wSkdh3.className = qQ2rG3 ? 'hide' : 'help-inline help-inline-error';
    return qQ2rG3;
};

function regularExpressionValid(hAEPe1, rE4Kp2, NLv6t4, h7m0Z3) {
    var IqSWK2 = new RegExp(rE4Kp2, 'g');
    //var fET4c = hAEPe1;
    //var wSkdh3 = NLv6t4;
    //var fET4c = $("#"+hAEPe1);
    var wSkdh3 = $("#"+NLv6t4);
    var qQ2rG3 = IqSWK2.test(hAEPe1);
    if (qQ2rG3) {
        wSkdh3.html("");
        wSkdh3.hide();
    }
    else {
        wSkdh3.show();
        wSkdh3.html(h7m0Z3);
        wSkdh3.css("display", "inline-block");;
        wSkdh3.attr("class", "help-inline help-inline-error");
    }
    //wSkdh3.innerHTML = qQ2rG3 ? '' : h7m0Z3;
    //wSkdh3.style.display = qQ2rG3 ? 'none' : 'inline-block';
    //wSkdh3.className = qQ2rG3 ? 'hide' : 'help-inline help-inline-error';
    return qQ2rG3;
};

