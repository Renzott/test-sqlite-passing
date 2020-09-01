# Test-sqlite-passing

## Sequelize

[Sequelize](http://sequelizejs.com/) es un ORM basado en Promesas para diversas bases de datos, incluyendo SQLite3.

## Problema

Tengo problemas al trabajar con SQLite3 en NodeJS. Ya he tenido un encuentro con esta base de datos en Android y al ser un aplicativo local no he tenido problemas de sincronizacion ni en instanciarlo. Ahora, al enfrentarme a este reto de implementar SQLite con Express y Testing, he podido encontrarme con problemas que antes eran invisibles. Uno de ellos fueron las funciones asincronas. Al final pude encontrar una solucion, usar una [Libreria](https://www.npmjs.com/package/sqlite) que daba soporte a las querys de SQLite para trabajarlos de forma asincrona. Pero no estaba Feliz con el resultado, queria un codigo mas limpio y facil de mantener.

## Solucion (con un par de problemas)

Sequelize llego como si fuera un angel, estaba investigando sobre la experiencia de otros desarrolladores con SQLite en NodeJS y encontre varias menciones de esta tecnologia. Estaba interesado y quize implementarla en mi proyecto, lamentablemente me encontre con un pequeño GRAN problema de impresion de Resultados y las asociaciones **hasOne-hasMany**.

La impresion de Resultados tenia que sea asi:

```Javascript
{
    id: 12345,
    type: "buy",
    user:{
        id: 98753,
        name: 'Pedro'
    },
    ...
}
```

Y la que me daba Sequelize era esta:

```Javascript
{
    id: 12345,
    type: "buy",
    users:[{
        id: 98753,
        name: 'Pedro'
    }],
    ...
}
```

Al pasar por los test, daba error, porque segun el test, una **Operacion** debe tener solo un **User**.

Para dejar claro, estaba usando hasMany, porque segun mi logica era **1:M**: 

Operacion -> [Users]

Ya que, segun como esta planteado el problema, da a entender que un Usuario va a tener varias Operaciones, pero, al imprimir de esta forma el resultado daba esto:

```Javascript
{
    id: 98753,
    name: 'Pedro', 
    operations:[{
        id: 12345,
        type: "buy",
    }],
    ...
}
```

Y regresan los errores, ya que esta no es la forma correcta segun el sistema de Testing, hay formas de solucionar esto, un poco mas largas, una de ellas es instanciar un **Object** y ordenar los datos de forma manual.

No estaba feliz con esta "Solucion", asi que, se me ocurrio otra idea. Que tal si declaro la asociacion de **Operacion** a **User** como un **1:1**?

Mas errores ***jajaja***, pero aun no acaba aqui mi solucion final, puedo darle un valor escondido a los **User**, un campo **_id**

```Javascript
{
    id: 12345,
    type: "buy",
    user:{
    //  _id:1,      <-- Valor escondido con la propiedad exclude
        id: 98753,
        name: 'Pedro'
    },
    ...
}
```

Aun no estoy tan conforme con esta solucion, ya que esto es duplicacion de data y esto es una practica poco recomendable en Base de Datos Relacionales. Pero, la forma de como esta estructurada las respuestas "correctas" segun los testings me hicieron llegar a esta solucion muy peculiar.

Cuando trabajo con NodeJS siempre lo hago con NoSQL (MongoDB). Ya que esta me da una flexibilidad y rapida respuesta a soluciones poco convencionales para una base de datos relacional, esto segun mi,aun poca, experiencia con entornos dinamicos como un servidor en NodeJS.

## Query vs ORM

Era de esperar que una ORM seria mas lenta que una query SQL.
Pero, la multiples herramientas y funcionalidades que proporcionan suplician esta pequeña lentitud.

![alt ORMvsSQL](https://i.imgur.com/4UlQGWs.png)


## Palabra finales

Fue interesante este reto, he podido aprender muchas cosas y tambien, por conocer esta nueva tecnologia, he dado solucion a un pequeño proyecto personal.
Gracias al equipo de [Continuum](https://www.continuumhq.com/) por plantearme este reto. 