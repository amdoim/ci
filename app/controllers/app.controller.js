import Db from "../model/app.model";
import { compact } from "../utils/response.helper";

// Create and Save a new Messages
<<<<<<< HEAD
function userController() {
=======
function userController(){

>>>>>>> eslint
  const index = (req, res) => {
    let data = {
      subtitle: "Início",
      tu: "vossamercerdes",
      eu: "juniorx",
    };
    res.render("index", compact(data));
    console.log("[app.controller.index] done");
  };

  const create = async (req, res) => {
    const data = {
      name: req.body.name || "Junior Alves",
      email: req.body.email || "junior.alvesxxxx@dr.com",
      keyTec: req.body.email || "j",
      password: req.body.email || "abc",
      className: req.body.email || "2a",
      classShift: req.body.email || "Matutino",
      profileBio: req.body.email || "Sou novo aqui, Olá!",
    };
    await Db.user
      .create({
        data: {
          name: data.name,
          email: data.email,
          keyTec: data.keyTec,
          password: data.password,
          class: {
            create: {
              name: data.className,
              shift: data.classShift,
            },
          },
          profile: {
            create: { bio: data.profileBio },
          },
        },
<<<<<<< HEAD
      })
      .then(() => {
        res.status(200);
        res.send("success");
      })
      .catch((e) => {
        res.status(500).send({ e: e });
      });
  };
=======
      }).then(()=>{
      res.status(200)
      res.send('success')
    }).catch((e)=>{
      res.status(500).send({e:e})
    })
  }
>>>>>>> eslint

  // Retrieve all messages from the database.

  const findAll = async (req, res) => {
    await Db.user
      .findMany({})
      .catch((error) => {
        res.status(500).send(error);
      })
      .then((response) => res.render("users", compact(response)))
      .catch((e) => res.send(e));
  };

  // Find a single user with a keyTec
  const findOne = async (req, res) => {
    await Db.user
      .findUnique({
        where: {
          keyTec: req.params.keyTec,
        },
        select: {
          keyTec: true,
          name: true,
          email: true,
          cash: true,
          profile: true,
          class: true,
          role: true,
          ranking: true,
        },
      })
      .then((response) => {
        if (req.query.api == true) res.send(response);
        let data = {
          ...response,
          subtitle: "Perfil - " + response.name,
        };
        res.render("users", compact(data));
      })
      .catch((error) => {
        res.status(404).render("notfound" + error);
      });
  };

  // Update a message identified by the messageId in the request
  const update = async (req, res) => {
    await Db.user
      .update({
        where: {
          email: "alice@prisma.io",
        },
        data: {
          name: "Aruã",
        },
      })
      .then(() => res.send("atualizado"))
      .catch((e) => res.send(e));
  };

  // Delete a message with the specified messageId in the request
  const deleta = async (req, res) => {
    await Db.user
      .delete({
        where: {
          email: "alice@prisma.io",
        },
      })
      .then(() => res.send("deletado"))
      .catch((e) => res.send(e));
  };

  const rankingPlus = async (req, res) => {
    let value = parseInt(req.query.value) || 10;
    value = value > 999 ? 1000 : value;
    value = value < -999 ? -1000 : value;
    await Db.user.updateMany({
<<<<<<< HEAD
      where: {
        keyTec: "atec",
=======
      where:{
        keyTec: req.query.tec || 'jr'
>>>>>>> eslint
      },
      data: {
        ranking: {
          increment: value,
<<<<<<< HEAD
        },
=======
        }
>>>>>>> eslint
      },
    });

    res.send("1");
  };

  return {
    index,
    create,
    findOne,
    findAll,
    deleta,
    update,
<<<<<<< HEAD
    rankingPlus,
  };
=======
    rankingPlus
  }

>>>>>>> eslint
}

export default userController();
