1. ¿Hizo falta una base de datos real para probar la regla de negocio?
  no
2. ¿Qué dice eso sobre para qué sirve el patrón Repository?
   que el patron repository no necesita la logica de las reglas de negocio por que esta aislada la logica
3. El Service recibe el repositorio como Repository<Prestamo>, no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?
   no se podría probar con un repositorio falso, también no se podría cambiar a alguna otra tecnología sin cambia el service
  
5. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían?
   solo dos archivos se tocarian
6. ¿Por qué tan pocos?
   porque al servicie no le importa de donde vengan los datos, simplemente él los toma de un repositorio que reciba como parametro
 

