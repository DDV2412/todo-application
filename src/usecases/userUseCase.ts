import jwt from "jsonwebtoken";

class UserUseCase {
  userRepo: any;

  constructor(userRepo: any) {
    this.userRepo = userRepo;
  }

  generateToken = (user: {}) => {
    let payload = {
      id: user["id"],
      pin: user["pin"],
    };

    return jwt.sign(payload, String(process.env.SECRET_JWT), {
      expiresIn: "1h",
    });
  };

  login = async (pin: number) => {
    const user = await this.userRepo.findByPin(pin);

    if (!user) {
      return null;
    }

    let payload = {
      id: user["id"],
      pin: user["pin"],
    };

    const token = this.generateToken(user);

    payload["token"] = token;

    return payload;
  };

  generate = async () => {
    return await this.userRepo.save({
      pin: Math.floor(1000 + Math.random() * 9000),
    });
  };
}

export default UserUseCase;
