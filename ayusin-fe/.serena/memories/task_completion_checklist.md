# Task Completion Checklist

## Before Completing Any Coding Task
1. **Code Quality Checks**:
   - `pnpm run format` - Ensure code is properly formatted
   - `pnpm run lint` - Check for linting errors and formatting issues
   - `pnpm run check` - Run TypeScript type checking

2. **Testing**:
   - `pnpm run test` - Run all tests to ensure nothing is broken
   - Add new tests if implementing new functionality

3. **Database Changes** (if applicable):
   - `pnpm run db:generate` - Generate migrations for schema changes
   - `pnpm run db:push` - Push changes to development database
   - Test database operations work correctly

4. **Build Verification**:
   - `pnpm run build` - Ensure production build succeeds
   - `pnpm run preview` - Test production build locally

## Git Workflow
- Commit changes with meaningful messages
- Consider creating feature branches for larger changes
- Ensure all files are properly tracked (check .gitignore)

## Environment Considerations
- Verify DATABASE_URL is set for database operations
- Check that all required environment variables are documented
- Test in both development and production-like environments

## Documentation
- Update README.md if adding new features or changing setup
- Document any new environment variables or configuration
- Add inline comments for complex logic