$(function () {
  const reactiveContent = () => {
    let lastWidth = window.innerWidth;

    const sendHeight = () => {
      const height = $('.page-wrap').height();
      window.parent.postMessage({ action: 'sendIframeHeight', iframeHeight: height }, '*');
    };

    const debounce = (callback, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    };

    sendHeight();

    $(window).on(
      'resize',
      debounce(() => {
        if (window.innerWidth !== lastWidth) {
          lastWidth = window.innerWidth;
          sendHeight();
        }
      }, 200),
    );

    $(window).on('message', (e) => {
      //if (e.originalEvent.origin !== 'https://xxx.com') return; // 親ページのオリジンを確認
      if (e.originalEvent.data && e.originalEvent.data.action && e.originalEvent.data.action === 'getHeight') {
        sendHeight();
      }
    });

    $('.sec-map__list-item-header').on('click', (e) => {
      if (!$(e.target).is('.sec-map__list-item-header')) return;
      sendHeight();
    });

    $('.sec-map__list-item-body').on('transitionend', (e) => {
      // padding-top, padding-bottom の2度発火する為、後発のpadding-topの完了で処理する
      if (e.originalEvent.propertyName === 'padding-top') {
        sendHeight();
      }
    });
  };

  const updateCss = () => {
    const validateColorCode = (colorCode) => {
      return /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(colorCode);
    };

    const getQueryParamColorCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        mainColor: urlParams.get('main-color'),
        subColor: urlParams.get('sub-color'),
        isHiddenHead: urlParams.get('hidden-head'),
        isHiddenClinicList: urlParams.get('hidden-clinic-list'),
      };
    };

    const { mainColor, subColor, isHiddenHead, isHiddenClinicList } = getQueryParamColorCode();

    if (isHiddenHead === 'true') {
      $('#sec-map__title').css('display', 'none');
    }

    if (isHiddenClinicList === 'false') {
      $('.sec-map__list').css('display', 'block');
    }

    if (mainColor && validateColorCode(mainColor)) {
      $('#svg-title-atn-text').css('fill', `#${mainColor}`);
      $('#svg-area-bg [class^="st"]').css('stroke', `#${mainColor}`);
      $('#svg-map-bg').css('fill', `#${mainColor}`);
      $('#svg-area-name').css('fill', `#${mainColor}`);
    }

    if (subColor && validateColorCode(subColor)) {
      $('.sec-map__list-item-header').css('background-color', `#${subColor}`);
    }
  };

  reactiveContent();
  updateCss();
});
