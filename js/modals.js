module.exports = {
    show:function(name) {
	$("#" + name).show();
    },

    hide:function(name) {
	if (name === undefined) $(".modal").hide();
	else $("#" + name).hide();
    }
}