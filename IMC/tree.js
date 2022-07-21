$(document).ready(function () {
    const prefix = "|-- ",
        prefix_last = "`-- ",
        spacer = "|   ",
        spacer_e = "    ",
        ul_templateobj = $("#templateobj > ul")/*.attr("id","ssobj")*/,
		ul_templatessobj = $("#templatessobj > ul"),
		ul_templateact = $("#templateact > ul"),
		ul_templateeval = $("#templateeval > ul"),
        /*ul_template = $("#template > ul"),
		ul_template = $("template > ul"),*/
		li_template = $("li", ul_templateobj),
		li_templatessobj= $("li", ul_templatessobj),
		li_templateact= $("li", ul_templateact),
		li_templateeval= $("li", ul_templateeval);
	
		
	//obj est un <li>...</li>

	const action = {
		//Ajouter un frère
        "add-siblingobj": function (obj) {
			obj.after(li_template.clone());
        },
		"add-siblingssobj": function (obj) {
			obj.after(li_templatessobj.clone());
        },
		"add-siblingact": function (obj) {
			obj.after(li_templateact.clone());
        },
		"add-siblingeval": function (obj) {
			obj.after(li_templateeval.clone());
        },
		
		
		//Ajouter un enfant
		"add-childssobj": function(obj){
			obj.append(ul_templatessobj.clone());
		},
		"add-childact": function(obj){
			obj.append(ul_templateact.clone());
		},
		"add-childeval": function(obj){
			obj.append(ul_templateeval.clone());
		},
		"add-none": function(obj){
		},
        
        delete: function (obj) { //En cascade
            obj.remove();
        },
    };

    $(document).on("click", "li.tree-node .controls > a", function () {
        action[this.getAttribute("data-func")]($(this).closest("li"));
        rebuild_tree();
        return false;
    });

    function get_subdir_text(obj, pad) {
        let padding = pad || "",
            out = "",
            items = obj.children("li"),
            last = items.length - 1;

        items.each(function (index) {
            const $this = $(this);
            out +=
                padding +
                (index == last ? prefix_last : prefix) +
                $this.children("input").val() +
                "\n";
            const subdirs = $this.children("ul");
            if (subdirs.length) {
                out += get_subdir_text(
                    subdirs,
                    padding + (index == last ? spacer_e : spacer)
                );
            }
        });
        return out;
    }

    function rebuild_tree() {
        $("#out").text($("#p_name").val() + "\n" + get_subdir_text($("#tree")));
    }

    $("#tree").append(li_template.clone());
    $(document).on("keyup", "#tree input", rebuild_tree);
    $("#p_name").on("keyup", rebuild_tree);

    $("#tree")
        .on("mouseover", "li", function (e) {
            $(this).children(".controls").show();
            e.stopPropagation();
        })
		//fait apparaître
        .on("mouseout", "li", function (e) {
            $(this).children(".controls").hide();
            e.stopPropagation();
        });
		//fais disparaitre
		
    rebuild_tree();
});
