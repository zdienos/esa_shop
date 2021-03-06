var ref_tahap_anggaran = new DaftarObj2({
	prefix : 'ref_tahap_anggaran',
	url : 'pages.php?Pg=ref_tahap_anggaran', 
	formName : 'ref_tahap_anggaranForm',
	ref_tahap_anggaran_form : '0',//default js ref_tahap_anggaran
	loading: function(){
		//alert('loading');
		this.topBarRender();
		this.filterRender();
		this.daftarRender();
/*		this.sumHalRender();*/
	
	},
	
	detail: function(){
		//alert('detail');
		var me = this;
		errmsg = this.CekCheckbox();
		if(errmsg ==''){ 
			var box = this.GetCbxChecked();			
			//UserAktivitasDet.genDetail();			
			
		}else{
		
			alert(errmsg);
		}
		
	},

	CariModul: function(){
		var me = this;	

		popupModul.el_namaModul= 'namaModul';		
		popupModul.el_idModul= 'idModul';																				
/*		RefBarangButuh.el_nama_barang= 'nama_barang';		*/																	
		popupModul.windowSaveAfter= function(){};
		popupModul.windowShow();	
	},	
	histori: function(id){
		var me = this;	

		popupHistori.el_namaHistori= 'namaHistori';		
		popupHistori.el_idHistori= 'idHistori';											
		popupHistori.windowSaveAfter= function(){};
		popupHistori.windowShow(id);	
	},	
	Temp: function(){
		var me = this;	
									
		popupJadwal_v2.windowShow();	
	},	
	daftarRender:function(){
		var me =this; //render daftar 
		addCoverPage2(
			'daftar_cover',	1, 	true, true,	{renderTo: this.prefix+'_cont_daftar',
			imgsrc: 'images/wait.gif',
			style: {position:'absolute', top:'5', left:'5'}
			}
		);
		$.ajax({
		  	url: this.url+'&tipe=daftar',
		 	type:'POST', 
			data:$('#'+this.formName).serialize(), 
		  	success: function(data) {		
				var resp = eval('(' + data + ')');
				document.getElementById(me.prefix+'_cont_daftar').innerHTML = resp.content;
/*				me.sumHalRender();*/
		  	}
		});
	},
	Baru: function(){	
		
		var me = this;
		var err='';
		
		if (err =='' ){		
			var cover = this.prefix+'_formcover';
			document.body.style.overflow='hidden';
			if(me.ref_tahap_anggaran_form==0){//baru dari ref_tahap_anggaran
				addCoverPage2(cover,1,true,false);	
			}else{//baru dari barang
				addCoverPage2(cover,999,true,false);	
			}
			$.ajax({
				type:'POST', 
				data:$('#'+this.formName).serialize(),
			  	url: this.url+'&tipe=formBaru',
			  	success: function(data) {		
					var resp = eval('(' + data + ')');			
					document.getElementById(cover).innerHTML = resp.content;	
					me.AfterFormBaru();
					$('.datepicker').datepicker({
						    dateFormat: 'dd-mm-yy',
							showAnim: 'slideDown',
						    inline: true,
							showOn: "button",
     						buttonImage: "images/calendar.gif",
      						buttonImageOnly: true,
							changeMonth: true,
      						changeYear: true,
							yearRange: "-20:+10",
							buttonText : '',
		});

			var status = document.getElementById("status");
			status.remove(0);
			var modul = document.getElementById("modul");
			modul.remove(0);
			  	}
			});
		
		}else{
		 	alert(err);
		}
	},
	Edit:function(){
		var me = this;
		errmsg = this.CekCheckbox();
		if(errmsg ==''){ 
			var box = this.GetCbxChecked();
			
			//this.Show ('formedit',{idplh:box.value}, false, true);			
			var cover = this.prefix+'_formcover';
			addCoverPage2(cover,999,true,false);	
			document.body.style.overflow='hidden';
			$.ajax({
				type:'POST', 
				data:$('#'+this.formName).serialize(),
				url: this.url+'&tipe=formEdit',
			  	success: function(data) {		
					var resp = eval('(' + data + ')');	
					if (resp.err ==''){		
						document.getElementById(cover).innerHTML = resp.content;
						me.AfterFormEdit(resp);
						$('.datepicker').datepicker({
						    dateFormat: 'dd-mm-yy',
							showAnim: 'slideDown',
						    inline: true,
							showOn: "button",
     						buttonImage: "images/calendar.gif",
      						buttonImageOnly: true,
							changeMonth: true,
      						changeYear: true,
							yearRange: "-20:+10",
							buttonText : '',
		});
					var status = document.getElementById("status");
					status.remove(0);
					var modul = document.getElementById("modul");
					modul.remove(0);
					}else{
						alert(resp.err);
						delElem(cover);
						document.body.style.overflow='auto';
					}
			  	}
			});
		}else{
			alert(errmsg);
		}
		
	},
		
	Simpan: function(){
		var tanggal = "";
		if($("#waktu_aktif").prop('disabled')){
			tanggal = "&waktu_aktif="+$("#waktu_aktif").val()+"&jamM="+$("#jamM").val()+"&menitM="+$("#menitM").val() ;
		}
		var me= this;	
		this.OnErrorClose = false	
		document.body.style.overflow='hidden';
		var cover = this.prefix+'_formsimpan';
		addCoverPage2(cover,1,true,false);	
		$.ajax({
			type:'POST', 
			data:$('#'+this.prefix+'_form').serialize()+tanggal,
			url: this.url+'&tipe=simpan',
		  	success: function(data) {		
				var resp = eval('(' + data + ')');	
				delElem(cover);		
				if(resp.err==''){ 
						me.Close();
						me.AfterSimpan();						
					

				}else{
					alert(resp.err);
				}
		  	}
		});
	}
		
});
