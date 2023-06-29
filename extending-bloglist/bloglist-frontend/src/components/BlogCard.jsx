import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BlogCard = ({ blog }) => {
    return (
        <Grid item key={blog.id} xs={12} sm={6} lg={4} xl={3}>
            <Card>
                <Link
                    component={RouterLink}
                    to={`/blogs/${blog.id}`}
                    underline="none"
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography
                                component="h3"
                                fontSize="1.25rem"
                                fontWeight={700}
                                marginBottom={1}
                            >
                                {blog.title}
                            </Typography>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography fontWeight={300}>
                                    By{' '}
                                    <Typography
                                        component="span"
                                        fontWeight={500}
                                    >
                                        {blog.author}
                                    </Typography>
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Typography id="likes-count">
                                        {blog.likes}
                                    </Typography>
                                    <FavoriteBorderIcon color="info" />
                                </Stack>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </Grid>
    );
};
export default BlogCard;
