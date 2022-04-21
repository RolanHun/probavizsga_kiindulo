$(function(){
    const Ajaxhivas = new MyAjax();
    const szakdogak = [];
    const szuloModell = $(".listaadmin");
    const sablonModell = $(".szakdoga");
    let apivegpont = "/api/szakdogak";
    Ajaxhivas.getAdat(apivegpont , szakdogak , kiir);
    
    function kiir(){
        szakdogak.forEach(function(elem){
            let node = sablonModell.clone().appendTo(szuloModell);
            const obj = new Szakdog(node, elem);
        })
        sablonModell.remove();
    }

    $(window).on("torol", (event) => {
        let id = event.detail.id;
        Ajaxhivas.deleteAdat(apivegpont,id);
        szakdogak.splice(0,szakdogak.length);
        Ajaxhivas.getAdat(apivegpont , szakdogak , kiir);
    })

});

class Szakdog{
    constructor(elem, adat){
        this.elem = elem;

        this.cime = this.elem.children(".cim");
        this.tagja = this.elem.children(".tag");
        this.gitlink = this.elem.children(".glink");
        this.oldallink = this.elem.children(".olink");
        this.modGomb = this.elem.children(".modosit");
        this.torGomb = this.elem.children(".torol");
        
        
        this.adat = adat;

        this.setAdat(this.adat);

        this.modGomb.on("click", ()=>{
            this.modositKattintTrigger();
        });
        this.torGomb.on("click", ()=>{
            this.torolKattintTrigger();
        });
    }

    setAdat(ertekek){
        this.cime.html(ertekek.szakdoga_nev);
        this.tagja.html(ertekek.tagokneve);
        this.gitlink.html(ertekek.githublink);
        this.oldallink.html(ertekek.oldallink);
    }

    modositKattintTrigger(){
        let esemeny = new CustomEvent("modositas", {detail:this.adat});
        window.dispatchEvent(esemeny);
        $("#szakdoga_nev").val(this.adat.szakdoga_nev);
        $("#tagokneve").val(this.adat.tagokneve);
        $("#oldallink").val(this.adat.oldallink);
        $("#githublink").val(this.adat.githublink);
    }
    torolKattintTrigger(){
        let esemeny = new CustomEvent("torol", {detail:this.adat});
        window.dispatchEvent(esemeny);
    }
}