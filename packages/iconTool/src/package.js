/* Do not change these import lines. Datagrok will import API library in exactly the same manner */
import * as grok from 'datagrok-api/grok';
import * as ui from 'datagrok-api/ui';
import * as DG from 'datagrok-api/dg';

export let _package = new DG.Package();

//name: LaunchApp
export function starApp() {

  let view = grok.shell.newView('Icon Tool');
  let fileUrl = ui.stringInput('','');
  fileUrl.readOnly = true;
  fileUrl.enabled = false;
  fileUrl.input.placeholder = '';

  let browseBtn = ui.button(ui.iconFA('folder-open'), ()=> $(browseFile).trigger('click'));
  let clearImage = ui.button(ui.iconFA('trash-alt'),()=> deleteImageFile());
  let fileButtons = ui.buttonsInput([
    ui.divH([
      fileUrl.input,
      browseBtn,
      clearImage
    ])
  ]);

  $(fileButtons).css('margin','0');
  $(fileButtons).children('label').text('Add image');

  let blendMode = ui.choiceInput('Blend mode', 'normal',['normal','multiply','darken','lighter','screen','overlay','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','color','luminosity'], value=>setBlendMode(value));

  let text = ui.stringInput('Add text','', value => setText(value,fontColorPicker.value,fontSize.value,fontWeight.value));
  let fontSize = ui.intInput('Text size','60', value => setText(text.value,fontColorPicker.value,value,fontWeight.value));
  $(fontSize.input).attr('type','number');
  let fontWeight = ui.choiceInput('Font weight', 'normal', ['lighter','normal','bold'], value => setText(text.value,fontColorPicker.value,fontSize.value,value));
  fontWeight.input.style.width='100%';

  let textX = ui.element('input','textX');
  $(textX).attr('type','range');
  $(textX).attr('min','-100');
  $(textX).attr('max','100');
  $(textX).attr('value','00');
  $(textX).css('margin-left','5px');

  let textY = ui.element('input','textY');
  $(textY).attr('type','range');
  $(textY).attr('min','-100');
  $(textY).attr('max','100');
  $(textY).attr('value','00');
  $(textY).css('margin-left','5px');

  let imageMargin = ui.intInput('Margins','0', value => setImage(image,imageRange.value,imageMargin.value));
  $(imageMargin.input).attr('type','number');
  let imageRange = ui.element('input','imageRange');
  $(imageRange).attr('type','range');
  $(imageRange).attr('min','0');
  $(imageRange).attr('max','100');
  $(imageRange).attr('value','100');

  let removeColorPicker = ui.element('input','colorPicker');
  let bgColorPicker = ui.element('input','colorPicker');
  let fontColorPicker = ui.element('input','colorPicker');
  $(bgColorPicker).attr('type','color');
  $(removeColorPicker).attr('type','color');
  $(removeColorPicker).css('visibility','hidden');
  $(removeColorPicker).css('margin-left','-20px');
  $(fontColorPicker).attr('type','color');
  $(bgColorPicker).val('#efefef');

  let infoIcon = ui.iconFA('info-circle');
  infoIcon.style.color='var(--blue-1)';
  infoIcon.style.marginLeft='10px';

  let removeColorBtn = ui.button(ui.iconFA('eye-dropper'),()=>$(removeColorPicker).trigger('click'));
  removeColorBtn.style.backgroundColor='var(--steel-1)';
  removeColorBtn.style.border='1px solid var(--steel-2)';
  removeColorBtn.style.width='28px';
  removeColorBtn.style.borderRadius='100%';
  $(removeColorBtn).children('i').removeClass('fal');
  $(removeColorBtn).children('i').addClass('fas');

  let removeColor = ui.buttonsInput([
    removeColorBtn,
    ui.tooltip.bind(infoIcon,'Set color or use the eyedropper to remove the color from the image'),
    removeColorPicker,
  ]);
  $(removeColor).children('label').text('Remove color');
  $(removeColor).children('label').css('padding-top','4px');
  $(removeColor).css('margin','0');

  let setColors = ui.buttonsInput([
    ui.divH([
      ui.divText('Font: ',{style:{color:'var(--grey-4)',margin:'0 5px 0 0'}}),
      fontColorPicker,
      ui.divText('BG: ',{style:{color:'var(--grey-4)',margin:'0 5px 0 10px'}}),
      bgColorPicker,
    ], {style:{alignItems:'center'}})
  ]);
  $(setColors).children('label').text('Colors');

  let setTransperency = ui.buttonsInput([
    imageRange
  ]);
  $(setTransperency).children('label').text('Transperency');
  $(setTransperency).css('margin','0');

  let textPosition = ui.buttonsInput([
    ui.divH([
      ui.divText('x: ',{style:{color:'var(--grey-4)'}}),
      textX,
    ]),
    ui.divH([
      ui.divText('y: ',{style:{color:'var(--grey-4)'}}),
      textY,
    ])
  ]);
  $(textPosition).children('label').text('Text position');



  removeColorPicker.onchange = (e) =>{
    let rgbColor = convertHex(removeColorPicker.value);
    removeImageBG(image,rgbColor,imageRange.value,imageMargin.value);
    removeColorPicker.value = null;
  }

  bgColorPicker.onchange = (e) =>{
    	drawIcon(bgColorPicker.value);
  }

  fontColorPicker.onchange = (e) =>{
    	setText(text.value, fontColorPicker.value, fontSize.value, fontWeight.value);
  }

  imageRange.onchange = (e)=>{
      setImage(image,imageRange.value,imageMargin.value);
  }

  textX.onchange = (e)=>{
      fX=textX.value;
      setText(text.value, fontColorPicker.value, fontSize.value,fontWeight.value);
  }

  textY.onchange = (e)=>{
      fY=textY.value;
      setText(text.value, fontColorPicker.value, fontSize.value,fontWeight.value);
  }

  let dwnl = ui.bigButton('Download', ()=> saveOutputIcon());

  let image = ui.element('img','image');
  $(image).hide();

  let image1 = ui.element('img','image');
  $(image1).hide();
  let image2 = ui.element('img','image');
  $(image2).hide();
  let image3 = ui.element('img','image');
  $(image3).hide();

  let browseFile = ui.element('input','browseFile');
  $(browseFile).attr('type','file');
  $(browseFile).hide();



  browseFile.onchange = (e) =>{
    fileUrl.value = $(browseFile).val().replace(/^.*[\\\/]/, '')
  	importImageFile(e)
  }


  let canvaBG = ui.element('canvas','canva');
  $(canvaBG).attr('width','300');
  $(canvaBG).attr('height','300');
  $(canvaBG).css('position','absolute');
  $(canvaBG).css('z-index','1');

  let canvaImage = ui.element('canvas','canva');
  $(canvaImage).attr('width','300');
  $(canvaImage).attr('height','300');
  $(canvaImage).css('position','absolute');
  $(canvaImage).css('z-index','2');

  let canvaText = ui.element('canvas','canva');
  $(canvaText).attr('width','300');
  $(canvaText).attr('height','300');
  $(canvaText).css('position','absolute');
  $(canvaText).css('z-index','3');

  let canvaOutPut = ui.element('canvas','canva');
  $(canvaOutPut).attr('width','300');
  $(canvaOutPut).attr('height','300');
  $(canvaOutPut).hide();

  let canva = ui.div([
    canvaBG,
    canvaImage,
    canvaText
  ]);

  $(canva).css('padding','10px');
  $(canva).css('border','1px dashed var(--grey-3)');
  $(canva).css('position','relative');
  $(canva).css('width','320px');
  $(canva).css('height','320px');


  let radius = 60;
  let x = 0;
  let y = 0;
  let width = 300;
  let height = 300;

  let fX = 0;
  let fY = 0;


  drawIcon();


  view.append(ui.divH([
    	ui.divV([
    	 canva,
       canvaOutPut,
      ]),
    	ui.divV([
        browseFile,
        ui.inputs([
          fileButtons,
          imageMargin,
          //blendMode,
          setTransperency,
          removeColor,
          text,
          fontSize,
          textPosition,
          fontWeight,
          setColors,
          ui.buttonsInput([dwnl])
        ]),
        image,
        image1,
        image2,
        image3
      ]),
  ]));



  function setText(string,color,size,fontWeight){
    let ctx1 = canvaText.getContext("2d");
    let ctxOutput = canvaOutPut.getContext("2d");
    ctx1.clearRect(x, y, canvaText.width, canvaText.height);
    iconMask(ctx1);
    ctx1.clip();
    ctx1.fillStyle = color;
    ctx1.textAlign = "center";
    ctx1.font = fontWeight+" "+size+"px Roboto";
    ctx1.fillText(string,150-fX,(canvaText.height/2)+(size/3)-fY);

    image3.src = canvaText.toDataURL();
    ctxOutput.drawImage(image3,x,y,width,height);
  }

  function setImage(image, transperency, margin){
    transperency = transperency/100;
    let ctx1 = canvaImage.getContext("2d");
    let ctxOutput = canvaOutPut.getContext("2d");
    ctx1.clearRect(x, y, canvaImage.width, canvaImage.height);
    iconMask(ctx1)
    ctx1.clip();
    ctx1.globalAlpha = transperency;
    ctx1.drawImage(image, x+(margin/2), y+(margin/2), width-margin, height-margin);
    image2.src = canvaImage.toDataURL();
    ctxOutput.drawImage(image2, x+(margin/2), y+(margin/2), width-margin, height-margin);
  }
  function setBlendMode(value){
    let ctx1 = canvaImage.getContext("2d");
    let ctxOutput = canvaOutPut.getContext("2d");
    mergeCanvas();
    ctxOutput.globalCompositeOperation = value;
    let imgdata = ctxOutput.getImageData(x+(margin/2), y+(margin/2), width-margin, height-margin);
    ctx1.clearRect(x, y, canvaImage.width, canvaImage.height);
    iconMask(ctx1)
    ctx1.clip();
    ctx1.putImageData(imgdata, x+(margin/2), y+(margin/2));
    image2.src = canvaImage.toDataURL();
    ctxOutput.drawImage(image2, x+(margin/2), y+(margin/2), width-margin, height-margin);
  }

  function removeImageBG(image,color,transperency,margin){
    let ctx1 = canvaImage.getContext("2d");
    let ctxOutput = canvaOutPut.getContext("2d");
    let imgdata = ctx1.getImageData(x+(margin/2), y+(margin/2), width-margin, height-margin);
    let data = imgdata.data;

  	console.log(color);

    ctx1.clearRect(x, y, canvaImage.width, canvaImage.height);
    iconMask(ctx1)
    ctx1.clip();

    for (let i = 0, n = data.length; i <n; i += 4) {
      let r = data[i];
      let g = data[i+1];
      let b = data[i+2];
      if((r >= color.r-20 && r<=color.r+20) && (g >= color.g-20 && g<=color.g+20) && (b >= color.b-20 && b<=color.b+20)){
        data[i+3] = '0.0';
      }
      if((r >= color.r-40 && r<=color.r+40) && (g >= color.g-40 && g<=color.g+40) && (b >= color.b-40 && b<=color.b+40)){
        data[i+3] = '0.1';
      }
      if((r >= color.r-60 && r<=color.r+60) && (g >= color.g-60 && g<=color.g+60) && (b >= color.b-60 && b<=color.b+60)){
        data[i+3] = '0.2';
      }
      if((r >= color.r-80 && r<=color.r+80) && (g >= color.g-80 && g<=color.g+80) && (b >= color.b-80 && b<=color.b+80)){
        data[i+3] = '0.3';
      }
      if((r >= color.r-100 && r<=color.r+100) && (g >= color.g-100 && g<=color.g+100) && (b >= color.b-100 && b<=color.b+100)){
        data[i+3] = '0.4';
      }
    }
    ctx1.putImageData(imgdata, x+(margin/2), y+(margin/2));
    image.src = canvaImage.toDataURL();
    image2.src = canvaImage.toDataURL();
    ctxOutput.drawImage(image2, x+(margin/2), y+(margin/2), width-margin, height-margin);
  }

  function drawIcon(color){
    if (color === undefined){
      color="#efefef";
    }
    let ctx = canvaBG.getContext("2d");
    let ctxOutput = canvaOutPut.getContext("2d");

    ctx.clearRect(x, y, canvaImage.width, canvaImage.height);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();

    image1.src = canvaBG.toDataURL();
    ctxOutput.drawImage(image1,x,y,width,height);
  }

  function iconMask(ctx){
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  //Upload, delete and save image

  function importImageFile(e) {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
      let contents = e.target.result;
      image.src=contents;
    };
    reader.onloadend = function(e) {
      setImage(image, imageRange.value, imageMargin.value);
    };
    reader.readAsDataURL(file);
  }

  function mergeCanvas(){
    let ctxOutput = canvaOutPut.getContext("2d");
    ctxOutput.clearRect(x, y, width, height);
    iconMask(ctxOutput);
    ctxOutput.clip();

    ctxOutput.drawImage(image1,x,y,width,height);
    ctxOutput.drawImage(image2,x,y,width,height);
    ctxOutput.drawImage(image3,x,y,width,height);
  }

  function saveOutputIcon(){
    	mergeCanvas();

      let outputLink = ui.element('a');
      outputLink.innerHTML = 'download image';
      outputLink.href = canvaOutPut.toDataURL();
      outputLink.download = "package.png";
      $(outputLink).trigger('click');
  }

  function deleteImageFile(){
    let ctx = canvaImage.getContext("2d");
    ctx.clearRect(x, y, width, height);
    image.src="";
    browseFile.value="";
    fileUrl.value="";
    imageRange.value = 100;
    setImage(image, imageRange.value, imageMargin.value);
  }

  function convertHex(hex){
      hex = hex.replace('#','');
      let r = parseInt(hex.substring(0,2), 16);
      let g = parseInt(hex.substring(2,4), 16);
      let b = parseInt(hex.substring(4,6), 16);
      let result = {r,g,b}
      return result;
  }


  //CSS
  $('.colorPicker').css('background-color','var(--grey-1)');
  $('.colorPicker').css('outline','none');
  $('.colorPicker').css('border','1px solid var(--grey-2)');
  $('.colorPicker').css('border-radius','2px');
  $('.colorPicker').css('width','32px');

}
