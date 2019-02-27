// blockUI default styles
if (/MSIE/.test(navigator.userAgent)) {
    $.blockUI.defaults.message = '<img src="/img/my/preloader-puff.gif" width="32" />';
} else {
    $.blockUI.defaults.message = '<div class="preloader preloader-puff-rounds preloader-lg">';
}
$.blockUI.defaults.css.border = 'none';
$.blockUI.defaults.css.borderRadius = '0';
$.blockUI.defaults.css.padding = '15px';
$.blockUI.defaults.css.boxShadow = 'none';
$.blockUI.defaults.css.backgroundColor = 'transparent';
$.blockUI.defaults.overlayCSS.backgroundColor = '#fff';
