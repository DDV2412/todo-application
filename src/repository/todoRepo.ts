const { todo: Todo } = require("../models");

class TodoRepo {
  #todo = Todo;

  findAll = async (id: string) => {
    return await this.#todo.findAll({
      where: {
        user_id: id,
      },
    });
  };

  findOne = async (id: string) => {
    return await this.#todo.findOne({
      where: {
        id: id,
      },
    });
  };

  save = async (todoData: typeof Todo) => {
    return await this.#todo.create(todoData);
  };

  update = async (id: string, todoData: typeof Todo) => {
    return await this.#todo.update(todoData, {
      where: {
        id: id,
      },
    });
  };

  delete = async (id: string) => {
    return await this.#todo.destroy({
      where: {
        id: id,
      },
    });
  };
}

export default TodoRepo;
