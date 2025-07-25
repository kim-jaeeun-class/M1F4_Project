window.onload = function () {
    bind();
};

function bind(){
    $(".accordio_box ol li").click(function(){
        $(".accordio_box ol li").removeClass("on");
        $(this).addClass("on");
    });
    
}