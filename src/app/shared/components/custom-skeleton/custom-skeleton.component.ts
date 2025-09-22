import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type SkeletonShape = 'rectangle' | 'circle' | 'rounded' | 'text';
export type SkeletonAnimation = 'pulse' | 'shimmer' | 'wave' | 'none';

@Component({
    selector: 'app-custom-skeleton',
    imports: [CommonModule],
    templateUrl: './custom-skeleton.component.html',
    styleUrl: './custom-skeleton.component.scss'
})
export class CustomSkeletonComponent {
    @Input() width: string = '100%';
    @Input() height: string = '20px';
    @Input() shape: SkeletonShape = 'rectangle';
    @Input() animation: SkeletonAnimation = 'shimmer';
    @Input() lines: number = 1; // For text skeleton
    @Input() className: string = '';
    @Input() customStyle: any = {};

    get skeletonClasses(): string {
        const classes = [
            'skeleton-loader',
            `skeleton-${this.shape}`,
            `skeleton-${this.animation}`,
            this.className
        ];
        return classes.filter(Boolean).join(' ');
    }

    get skeletonStyle(): any {
        const baseStyle = {
            width: this.width,
            height: this.height,
            ...this.customStyle
        };

        // Special styling for circle shape
        if (this.shape === 'circle') {
            const size = this.width || this.height;
            baseStyle.width = size;
            baseStyle.height = size;
            baseStyle.borderRadius = '50%';
        }

        return baseStyle;
    }

    generateTextLines(): number[] {
        return Array(this.lines).fill(0).map((_, index) => index);
    }
}