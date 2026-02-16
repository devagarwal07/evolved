import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PathsService } from './paths.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePathDto, UpdateNodeDto } from './dto/path.dto';

@Controller('paths')
@UseGuards(JwtAuthGuard)
export class PathsController {
    constructor(private readonly pathsService: PathsService) { }

    @Post('generate')
    async generatePath(@Request() req: any, @Body() dto: CreatePathDto) {
        return this.pathsService.generatePath(req.user.id, dto.topic, dto.goal, dto.level);
    }

    @Get()
    async getPaths(@Request() req: any) {
        return this.pathsService.getPaths(req.user.id);
    }

    @Get(':id')
    async getPath(@Request() req: any, @Param('id') id: string) {
        return this.pathsService.getPath(id, req.user.id);
    }

    @Get(':pathId/nodes/:nodeId/videos')
    async getNodeVideos(@Request() req: any, @Param('pathId') pathId: string, @Param('nodeId') nodeId: string) {
        return this.pathsService.getNodeVideos(pathId, nodeId, req.user.id);
    }

    @Post(':pathId/nodes/:nodeId/watched')
    async markVideoWatched(
        @Request() req: any,
        @Param('pathId') pathId: string,
        @Param('nodeId') nodeId: string,
        @Body() body: { videoId: string },
    ) {
        return this.pathsService.markVideoWatched(pathId, nodeId, req.user.id, body.videoId);
    }

    @Patch(':pathId/nodes/:nodeId')
    async updateNode(@Request() req: any, @Param('pathId') pathId: string, @Param('nodeId') nodeId: string, @Body() dto: UpdateNodeDto) {
        return this.pathsService.updateNodeStatus(pathId, nodeId, req.user.id, dto.status);
    }

    @Delete(':id')
    async deletePath(@Request() req: any, @Param('id') id: string) {
        return this.pathsService.deletePath(id, req.user.id);
    }
}
