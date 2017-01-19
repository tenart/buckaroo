$(function() {
        
    $(function() {
        FastClick.attach(document.body);
    });
    
    $('.page').hide();
    $('#tracking_scroll').hide();
    $('#content_shipments').show();
    
    $('.nav_button').click(function() {
        
        var activeContent = '#content_' + $(this).attr('id');
        $('#main_content > .padding > section').hide();
        $(activeContent).show();
        
        if ( $(this).attr('id') == 'shipments' ) {
            $('#new_post').show();
        } else {
            $('#new_post').hide();
        };
        
        if ( $(this).attr('id') != 'tracking' ) {
            $('#main_content > .padding').addClass('always_scroll');
        } else {
            $('#main_content > .padding').removeClass('always_scroll');
        };
        
        $('.nav_button').removeClass('active');
        $(this).addClass('active');
        resetButtons();
        var activeIcon = 'url(img/' + $(this).attr('id') + '-a.png)';
        $(this).css('background-image', activeIcon);
        $('body > #header > h1').text( $(this).text() );
    });
    
    $('#tracking').click(function() {
        $('#map').css('margin-top', '0px');
        $('#tracking_scroll').show();
    });
    
    $('#package_size .tray_option').click(function() {
        $('#package_size .tray_option').removeClass('active');
        $(this).addClass('active');
        resetSizeButtons();
        var activeIcon = 'url(img/options/' + $(this).attr('id') + '-i-a.png)';
        $(this).css('background-image', activeIcon);
        var activeSizeVis = 'img/options/' + $(this).attr('id') + '.png';
        $('#size_vis').attr('src', activeSizeVis);
    });
    
    $('#pickup_person .tray_option').click(function() {
        $('#pickup_person .tray_option').removeClass('active');
        $(this).addClass('active');
        resetPickupButtons();
        var activeIcon = 'url(img/options/' + $(this).attr('id') + '-a.png)';
        $(this).css('background-image', activeIcon);
        
        var activeOptionContent = '#' + $(this).attr('id') + '_option';
        $('#new_popup section.pickup').hide();
        $(activeOptionContent).show();
    });
    
    $('#dropoff_person .tray_option').click(function() {
        $('#dropoff_person .tray_option').removeClass('active');
        $(this).addClass('active');
        resetDropoffButtons();
        var activeIcon = 'url(img/options/' + $(this).attr('id') + '-a.png)';
        $(this).css('background-image', activeIcon);
        
        var activeOptionContent = '#' + $(this).attr('id') + '_option';
        $('#new_popup section.dropoff').hide();
        $(activeOptionContent).show();
    });
    
    $('#content_shipments .shipment_card').click(function() {
        $(this).toggleClass('expanded'); 
        $('#content_shipments').show();
    });
    
    $('#new_post').click(function() {
        $('#new_popup').addClass('focus');
        $('body > #main_content').css('overflow', 'hidden');
    });
    
    $('#new_cancel').click(function() {
        $('#new_popup').removeClass('focus');
        $('body > #main_content').css('overflow', 'scroll');
    });
    
    $('#savedraft').click(function() {
        $('#new_popup').removeClass('focus');
        $('body > #main_content').css('overflow', 'scroll');
    });
    
    $('#submit').click(function() {
        $('#new_popup').removeClass('focus');
        
        $('#content_shipments').prepend('<div class="shipment_card"><img src=""><h1 class="title">' + $('#ipname').val() + '</h1><p class="origin"><span class="theme">From</span> ' + $('#ipcity').val() + ', ' + $('#ipstate').val() + ' ' + $('#ipzip').val() + '</p><p class="destination"><span class="theme">To</span> ' + $('#ipcitydo').val() + ', ' + $('#ipstatedo').val() + ' ' + $('#ipzipdo').val() + '</p><p class="extra">Posted Today</p><div class="caret"></div><div class="progress"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><progress value="0" max="100"></progress><div class="dlabel">Pending</div><div class="dlabel">Picked Up</div><div class="dlabel">On The Way</div><div class="dlabel">Delivered</div></div></div>');
        
        $('body > #main_content').css('overflow', 'scroll');
        
    });
    
    $('#ipweight').blur(function() {
        var inputVal = $('#ipweight').val();
        if( inputVal.length > 0 ) {
            if ( inputVal > 50 ) {
                $('#ipweight').val('50')
            };
            $('#weight_prog').css('width', inputVal/50*100 + '%');
        };
    });
    
    function resetButtons() {
        $('#shipments').css('background-image','url(img/shipments.png)');
        $('#activities').css('background-image','url(img/activities.png)');
        $('#tracking').css('background-image','url(img/tracking.png)');
        $('#options').css('background-image','url(img/options.png)');
    }
    
    function resetSizeButtons() {
        $('#small').css('background-image','url(img/options/small-i.png)');
        $('#medium').css('background-image','url(img/options/medium-i.png)');
        $('#large').css('background-image','url(img/options/large-i.png)');
        $('#xlarge').css('background-image','url(img/options/xlarge-i.png)');
    }
    
    function resetPickupButtons() {
        $('#me').css('background-image','url(img/options/me.png)');
        $('#someone').css('background-image','url(img/options/someone.png)');
        $('#selfpickup').css('background-image','url(img/options/selfpickup.png)');
    }
    
    function resetDropoffButtons() {
        $('#medo').css('background-image','url(img/options/me.png)');
        $('#someonedo').css('background-image','url(img/options/someone.png)');
        $('#selfdo').css('background-image','url(img/options/selfpickup.png)');
    }
    
})