import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let repository: Repository<Department>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    repository = module.get<Repository<Department>>(
      getRepositoryToken(Department),
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add new department', async () => {
    const department = {
      department_id: 1,
      name: 'test',
    };

    mockRepository.create.mockReturnValue(department);
    mockRepository.save.mockResolvedValue(department);

    const result = await service.create(department);

    expect(result).toEqual(department);
    expect(mockRepository.create).toHaveBeenCalledWith(department);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  // it('should return all departments', async () => {
  //   const departments = service.findAll();
  //   expect(departments).toEqual('This action returns all departments');
  // });

  // it('should find department by id', async () => {
  //   const department = {
  //     department_id: 1,
  //     name: 'test',
  //   };
  //   service.create(department);
  //   expect(service.findOne(1)).toEqual(department);
  // });

  // it('should return undefined when department not found', async () => {
  //   expect(service.findOne(999)).toBeUndefined();
  // });

  // it('should update department', async () => {
  //   const department = {
  //     department_id: 1,
  //     name: 'test',
  //   };
  //   service.create(department);
  //   const updateDepartment = { name: 'test update department' };
  //   const result = await service.update(1, updateDepartment);
  //   expect(result).toEqual({
  //     department_id: 1,
  //     name: 'test update department',
  //   });
  // });

  // it('should return null when trying to update a non-exist department', async () => {
  //   const updateDepartment = { name: 'test update department' };
  //   const result = await service.update(999, updateDepartment);
  //   expect(result).toBeNull();
  // });

  // it('should delete department', async () => {
  //   const department = {
  //     department_id: 1,
  //     name: 'test',
  //   };
  //   service.create(department);
  //   const result = service.remove(1);
  //   expect(result).toBeTruthy();
  // });

  // it('should return null when trying to delete a none-exist department', () => {
  //   const result = service.remove(999);
  //   expect(result).toBeNull();
  // });
});
