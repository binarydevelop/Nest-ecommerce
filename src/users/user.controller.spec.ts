import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service";

describe('User Controller', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    const mockUserService = {
        findAll : jest.fn(() => {
            return ['test']
        }), // 1st way of Mocking

        findByEmail: jest.fn().mockImplementation((email) => {
            return {
                id: expect.any(Number),
                email : 'testing@test.com'
            }
        })
    }       // 2nd way of Mocking

    
    beforeEach(async() => {
        const mockRoleGuard: CanActivate  = { canActivate: jest.fn(() => true) }; 
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService,]
                })
                .overrideProvider(UsersService).useValue(mockUserService)
                .overrideGuard(RolesGuard).useValue(mockRoleGuard)
                .compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    });


describe('find All', () => {
    it('should return an array of users', async() => {
        
        expect(await usersController.findAll()).toBe(mockUserService.findAll())
    })
  })  

describe('find By Email', () => {
    it('should return a user', async() => {
        const user = {
            id: expect.any(Number),
            email : 'testing@test.com'
        }
        expect(await usersController.findByEmail(expect.any(String))).toBe(user)
    })
})
});