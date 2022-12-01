const { user: User } = require("../models");

class UserRepo {
  #user = User;

  findOne = async (id: string) => {
    return await this.#user.findOne({
      where: {
        id: id,
      },
    });
  };

  save = async (userData: typeof User) => {
    return await this.#user.create(userData);
  };

  findByPin = async (pin: number) => {
    return await this.#user.findOne({
      where: {
        pin: pin,
      },
    });
  };
}

export default UserRepo;
