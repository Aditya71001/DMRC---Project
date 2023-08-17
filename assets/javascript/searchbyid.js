$.ajax({
    method:'post',
    url:'/database/findcols',
    data:{
          table:tablename,
          db:chosen_db
          },
    success:function(data){
      console.log("Successfull in sending request")
      cols.splice(0,cols.length)
      cols=data.fields

      $("option[class='col1options']").remove();
      $("option[class='col2options']").remove();
      $("option[class='col3options']").remove();
      for(var i=0;i<cols.length;i++)
      {
              $('#selectcol1').append($('<option>', {
                  value: cols[i],
                  text: cols[i],
                  class:'col1options'
                  
              }));
      }
    },
  error:function(error){
    console.error("Error sending request",error);
    }
  }
  );