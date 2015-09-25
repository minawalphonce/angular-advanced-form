# angular-advanced-form
Adding extra functions to ngForm / form for angularJs 

adding 2 extra behaviors to ngForm / FOrm 

1- adding method form.validate().
this method loop over all controls in the form and execute the $validate method, 
this is usfull if you want to create a form validation on a button and you don't want to use 
the method return Promise will be resolved when all validation executed. 

2- you can add ' ngFormIsolateValidation="true" ' attribute to a nested ngForm if you want to isolate it validation from its parent. 

Using 
just add `ngAdvancedForm` in your module init and you can use the method validate and the attribute.
