class TodoUseCase {
  todoRepo: any;

  constructor(todoRepo: any) {
    this.todoRepo = todoRepo;
  }

  create = async (todoData: Object) => {
    return await this.todoRepo.save(todoData);
  };

  findOne = async (id: string) => {
    return await this.todoRepo.findOne(id);
  };

  findAll = async (id: string) => {
    return await this.todoRepo.findAll(id);
  };

  update = async (id: string, todoData: Object) => {
    return await this.todoRepo.update(id, todoData);
  };

  deleteById = async (id: string) => {
    return await this.todoRepo.delete(id);
  };
}

export default TodoUseCase;
